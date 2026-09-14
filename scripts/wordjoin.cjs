const fs = require("fs");
const path = require("path");

const JOINER = "\u2060";
const root = process.argv[2] || "public";
const segmenter = new Intl.Segmenter("zh-Hant", { granularity: "word" });

function joinWords(text) {
  const clean = text.split(JOINER).join("");
  let out = "";
  for (const part of segmenter.segment(clean)) {
    out += part.isWordLike ? [...part.segment].join(JOINER) : part.segment;
  }
  return out;
}

function joinTextNodes(html) {
  return html.replace(/(<[^<>]*>|[^<>]+)/g, (token) => {
    if (token.startsWith("<")) {
      return token;
    }
    return joinWords(token);
  });
}

function processHtml(html) {
  const headed = html.replace(
    /<(title|h1|h2|h3)(\s[^<>]*)?>[\s\S]*?<\/\1>/g,
    (element) => joinTextNodes(element)
  );
  return headed.replace(
    /(<li><time[^<>]*>[^<>]*<\/time> <a href="[^"]*">)([^<>]*)(<\/a>)/g,
    (match, open, text, close) => open + joinWords(text) + close
  );
}

function walk(directory) {
  let count = 0;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      count += walk(full);
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      fs.writeFileSync(full, processHtml(fs.readFileSync(full, "utf8")));
      count += 1;
    }
  }
  return count;
}

console.log("wordjoin: %d files", walk(root));
