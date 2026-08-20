export function selectRadarDate(dates, requested) {
  if (requested && dates.includes(requested)) return requested;
  return dates[0] ?? null;
}

export function filterRadarItems(items, query) {
  const needle = query.trim().toLocaleLowerCase();
  if (!needle) return items;
  return items.filter((item) =>
    [item.title, item.summary.zh, item.summary.en].some((value) =>
      value.toLocaleLowerCase().includes(needle),
    ),
  );
}

export function safeRadarHref(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? value : "#";
  } catch {
    return "#";
  }
}

function element(documentRef, tag, className, text) {
  const node = documentRef.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function link(documentRef, text, href, className) {
  const node = element(documentRef, "a", className, text);
  const safeHref = safeRadarHref(href);
  node.href = safeHref;
  if (safeHref !== "#") {
    node.target = "_blank";
    node.rel = "noopener noreferrer";
  }
  return node;
}

function scoreText(value) {
  return Number.isFinite(value) ? value.toFixed(1) : "—";
}

function publishedText(value) {
  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "时间未知";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function appendScore(documentRef, container, item) {
  const score = element(documentRef, "div", "score");
  score.append(element(documentRef, "strong", "score-number", scoreText(item.totalScore)));
  const track = element(documentRef, "span", "score-track");
  const fill = element(documentRef, "span", "score-fill");
  fill.style.width = `${Math.min(100, Math.max(0, item.totalScore))}%`;
  track.append(fill);
  score.append(track);
  container.append(score);
}

function renderTop5(documentRef, documentData) {
  const container = documentRef.getElementById("top5-grid");
  container.replaceChildren();
  const top5 = documentData.items.filter((item) => item.isTop5).slice(0, 5);
  for (const item of top5) {
    const article = element(documentRef, "article", item.rank === 1 ? "signal-card lead" : "signal-card");
    const meta = element(documentRef, "div", "card-meta");
    meta.append(
      element(documentRef, "span", "rank", `#${item.rank}`),
      element(documentRef, "span", "published", publishedText(item.publishedAt)),
    );
    article.append(meta);
    const title = element(documentRef, "h3", "card-title");
    title.append(link(documentRef, item.title, item.url, "title-link"));
    article.append(title, element(documentRef, "p", "summary", item.summary.zh));
    appendScore(documentRef, article, item);
    const actions = element(documentRef, "div", "card-actions");
    actions.append(
      link(documentRef, "阅读原文 ↗", item.url, "action-link"),
      link(documentRef, "HN 讨论 ↗", item.hnUrl, "action-link secondary"),
    );
    article.append(actions);
    container.append(article);
  }
}

function renderAll(documentRef, documentData, query) {
  const container = documentRef.getElementById("all-list");
  const count = documentRef.getElementById("result-count");
  const filtered = filterRadarItems(documentData.items, query);
  count.textContent = `${filtered.length} / ${documentData.items.length}`;
  container.replaceChildren();

  if (filtered.length === 0) {
    container.append(element(documentRef, "p", "empty-inline", "没有匹配的信号，换一个关键词试试。"));
    return;
  }

  for (const item of filtered) {
    const row = element(documentRef, "article", "stream-row");
    row.append(element(documentRef, "span", "stream-rank", String(item.rank).padStart(2, "0")));
    const body = element(documentRef, "div", "stream-body");
    const title = element(documentRef, "h3", "stream-title");
    title.append(link(documentRef, item.title, item.url, "title-link"));
    body.append(title, element(documentRef, "p", "stream-summary", item.summary.zh));
    const detail = element(documentRef, "div", "stream-detail");
    detail.append(
      element(documentRef, "span", "detail-chip", `基础 ${scoreText(item.baseScore)}`),
      element(documentRef, "span", "detail-chip", `编辑 ${scoreText(item.editorialScore)}`),
      link(documentRef, "HN", item.hnUrl, "detail-link"),
    );
    body.append(detail);
    row.append(body);
    appendScore(documentRef, row, item);
    container.append(row);
  }
}

function renderHeader(documentRef, documentData) {
  documentRef.getElementById("selected-date").textContent = documentData.date;
  documentRef.getElementById("generated-at").textContent = `更新 ${publishedText(documentData.generatedAt)}`;
  documentRef.getElementById("scan-count").textContent = String(documentData.scannedCount);
  documentRef.getElementById("candidate-count").textContent = String(documentData.items.length);
  documentRef.getElementById("duplicate-count").textContent = String(documentData.duplicateCount);
  const mode = documentRef.getElementById("score-mode");
  mode.textContent = documentData.mode === "deepseek" ? "DeepSeek 编辑评分" : "确定性降级";
  mode.dataset.mode = documentData.mode;
}

function setPageState(documentRef, state, message) {
  const status = documentRef.getElementById("page-status");
  const content = documentRef.getElementById("radar-content");
  status.dataset.state = state;
  status.textContent = message;
  status.hidden = state === "ready";
  content.hidden = state !== "ready";
}

function validateDocument(value) {
  if (
    typeof value !== "object" ||
    value === null ||
    value.schemaVersion !== 1 ||
    typeof value.date !== "string" ||
    !Array.isArray(value.items)
  ) {
    throw new Error("invalid Radar JSON");
  }
  return value;
}

export async function startRadarPage(options = {}) {
  const documentRef = options.document ?? window.document;
  const fetchImpl = options.fetchImpl ?? window.fetch.bind(window);
  const locationRef = options.location ?? window.location;
  const historyRef = options.history ?? window.history;
  const dateSelect = documentRef.getElementById("date-select");
  const newerButton = documentRef.getElementById("newer-date");
  const olderButton = documentRef.getElementById("older-date");
  const search = documentRef.getElementById("radar-search");
  let dates = [];
  let selectedDate = null;
  let documentData = null;

  const loadDate = async (date, updateUrl = true) => {
    selectedDate = date;
    setPageState(documentRef, "loading", "正在接收今日信号…");
    try {
      const response = await fetchImpl(`./digests/${date}/ai-radar.json`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Radar JSON HTTP ${response.status}`);
      documentData = validateDocument(await response.json());
      dateSelect.value = date;
      const index = dates.indexOf(date);
      newerButton.disabled = index <= 0;
      olderButton.disabled = index < 0 || index >= dates.length - 1;
      renderHeader(documentRef, documentData);
      renderTop5(documentRef, documentData);
      renderAll(documentRef, documentData, search.value);
      setPageState(documentRef, "ready", "");
      if (updateUrl) {
        const nextUrl = new URL(locationRef.href);
        nextUrl.searchParams.set("date", date);
        historyRef.pushState({ date }, "", nextUrl);
      }
    } catch (error) {
      console.error("[radar-page] Failed to load daily Radar data", error);
      setPageState(documentRef, "error", "这一天的信号暂时无法读取，请稍后刷新或选择其他日期。");
    }
  };

  setPageState(documentRef, "loading", "正在连接信息雷达…");
  try {
    const response = await fetchImpl("./radar-manifest.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Radar manifest HTTP ${response.status}`);
    const manifest = await response.json();
    dates = Array.isArray(manifest.dates) ? manifest.dates.filter((date) => typeof date === "string") : [];
    if (dates.length === 0) {
      setPageState(
        documentRef,
        "empty",
        "还没有可阅读的雷达记录。首次日任务完成后，这里会出现当天 30 条信号。",
      );
      return;
    }
    dateSelect.replaceChildren();
    for (const date of dates) {
      const option = element(documentRef, "option", "", date);
      option.value = date;
      dateSelect.append(option);
    }
    const requested = new URL(locationRef.href).searchParams.get("date");
    const firstDate = selectRadarDate(dates, requested);
    await loadDate(firstDate, requested !== firstDate);
  } catch (error) {
    console.error("[radar-page] Failed to load Radar manifest", error);
    setPageState(documentRef, "error", "雷达日期索引暂时不可用。请确认日任务已经生成 radar-manifest.json。");
    return;
  }

  dateSelect.addEventListener("change", () => void loadDate(dateSelect.value));
  newerButton.addEventListener("click", () => {
    const index = dates.indexOf(selectedDate);
    if (index > 0) void loadDate(dates[index - 1]);
  });
  olderButton.addEventListener("click", () => {
    const index = dates.indexOf(selectedDate);
    if (index >= 0 && index < dates.length - 1) void loadDate(dates[index + 1]);
  });
  search.addEventListener("input", () => {
    if (documentData) renderAll(documentRef, documentData, search.value);
  });
  window.addEventListener("popstate", () => {
    const requested = new URL(locationRef.href).searchParams.get("date");
    const date = selectRadarDate(dates, requested);
    if (date && date !== selectedDate) void loadDate(date, false);
  });
}
