(function () {
  function figurify(image) {
    if (image.classList.contains("cover")) {
      return;
    }
    var parent = image.parentNode;
    if (!parent || !parent.parentNode || parent.nodeName === "FIGURE") {
      return;
    }
    var figure = document.createElement("figure");
    var text = image.getAttribute("alt") || "";
    if (text) {
      var caption = document.createElement("figcaption");
      caption.textContent = text;
      figure.appendChild(caption);
    }
    if (parent.nodeName === "P" && parent.textContent.trim() !== "") {
      parent.parentNode.insertBefore(figure, parent);
    } else if (parent.nodeName === "P") {
      parent.parentNode.replaceChild(figure, parent);
    } else {
      parent.replaceChild(figure, image);
    }
    figure.insertBefore(image, figure.firstChild);
    if (parent.nodeName === "P" && parent.parentNode && parent.textContent.trim() === "") {
      parent.parentNode.removeChild(parent);
    }
  }

  var overlay = null;

  function close() {
    if (overlay && overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
    overlay = null;
  }

  function open(image) {
    close();
    overlay = document.createElement("div");
    overlay.className = "zoom-overlay";
    overlay.setAttribute("role", "dialog");
    var full = document.createElement("img");
    full.src = image.currentSrc || image.src;
    full.alt = image.getAttribute("alt") || "";
    overlay.appendChild(full);
    overlay.addEventListener("click", close);
    document.body.appendChild(overlay);
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      close();
    }
  });

  var images = document.querySelectorAll("article img");
  Array.prototype.forEach.call(images, function (image) {
    figurify(image);
    image.addEventListener("click", function () {
      open(image);
    });
  });
})();
