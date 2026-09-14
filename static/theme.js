(function () {
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var label = document.getElementById("theme-label");
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch {}
  if (stored === "dark" || stored === "light") {
    root.setAttribute("data-theme", stored);
  }

  function system() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function current() {
    return root.getAttribute("data-theme") || system();
  }

  function sync() {
    var dark = current() === "dark";
    toggle.checked = dark;
    if (label) {
      label.textContent = dark ? "淺色" : "深色";
    }
  }

  if (!toggle) {
    return;
  }
  sync();
  toggle.addEventListener("change", function () {
    var next = toggle.checked ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    sync();
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (!root.getAttribute("data-theme")) {
      sync();
    }
  });
})();
