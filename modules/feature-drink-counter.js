BTFW.define("feature:drink-counter", [], async () => {
  const $ = (s, r = document) => r.querySelector(s);
  const motion = await BTFW.init("util:motion");

  let currentCount = 0;
  let socketWired = false;

  function tierForCount(n) {
    if (n <= 0) return "sober";
    if (n < 5) return "warm";
    if (n < 10) return "flush";
    if (n < 25) return "droopy";
    if (n < 40) return "sick";
    return "hungover";
  }

  function hideStockDrinkbar() {
    const wrap = document.getElementById("drinkbarwrap");
    if (wrap) wrap.hidden = true;
    const bar = document.getElementById("drinkbar");
    if (bar) bar.hidden = true;
  }

  function updateCount(count) {
    currentCount = Math.max(0, Number(count) || 0);
    const widget = document.getElementById("btfw-drink-counter");
    if (!widget) return;

    const tier = tierForCount(currentCount);
    widget.dataset.tier = tier;
    widget.classList.toggle("is-hidden", currentCount === 0);

    const countEl = widget.querySelector(".btfw-drink-counter__count");
    if (countEl) countEl.textContent = String(currentCount);

    const label = currentCount === 1 ? "1 drink" : `${currentCount} drinks`;
    widget.setAttribute("aria-label", `Channel drinks: ${label}`);
    widget.title = label;
  }

  function readFallbackCount() {
    const el = document.getElementById("drinkcount");
    if (!el) return null;
    const m = (el.textContent || "").trim().match(/^(\d+)/);
    return m ? Number(m[1]) : null;
  }

  function ensureDrinkWidget() {
    const actions = $("#chatwrap .btfw-chat-bottombar #btfw-chat-actions");
    if (!actions || document.getElementById("btfw-drink-counter")) {
      return Boolean(document.getElementById("btfw-drink-counter"));
    }

    const widget = document.createElement("div");
    widget.id = "btfw-drink-counter";
    widget.className = "btfw-drink-counter is-hidden";
    widget.dataset.tier = "sober";
    widget.setAttribute("aria-live", "polite");
    widget.innerHTML = `
      <div class="btfw-drink-counter__avatar" aria-hidden="true">
        <span class="btfw-drink-counter__face"></span>
      </div>
      <span class="btfw-drink-counter__count">0</span>
    `;

    if (motion.prefersReducedMotion()) {
      widget.classList.add("btfw-drink-counter--reduce-motion");
    }

    const anchor = actions.querySelector("#usercount");
    actions.insertBefore(widget, anchor || null);

    updateCount(currentCount);
    hideStockDrinkbar();
    return true;
  }

  function wireSocket() {
    if (socketWired) return;
    const sock = window.socket;
    if (!sock || typeof sock.on !== "function") {
      setTimeout(wireSocket, 500);
      return;
    }
    socketWired = true;
    sock.on("drinkCount", (count) => {
      updateCount(count);
      hideStockDrinkbar();
    });
  }

  function boot() {
    hideStockDrinkbar();

    const fallback = readFallbackCount();
    if (fallback !== null && fallback > 0) {
      updateCount(fallback);
    }

    const sync = () => {
      ensureDrinkWidget();
      wireSocket();
      hideStockDrinkbar();
    };

    sync();

    const mo = new MutationObserver(sync);
    mo.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  return { name: "feature:drink-counter", updateCount };
});
