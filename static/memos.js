(function () {
  var mount = document.getElementById("memos");
  var pool = document.getElementById("memos-pool");
  if (!mount || !pool) {
    return;
  }
  var items = pool.content.children;
  if (!items.length) {
    return;
  }
  var node = items[Math.floor(Math.random() * items.length)].cloneNode(true);
  var image = node.querySelector("img");
  node.style.visibility = "hidden";
  if (image) {
    image.onload = function () {
      node.style.visibility = "";
    };
    image.onerror = function () {
      mount.removeChild(node);
    };
  } else {
    node.style.visibility = "";
  }
  mount.appendChild(node);
  if (image && image.complete) {
    node.style.visibility = "";
  }
})();
