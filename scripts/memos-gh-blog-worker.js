export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("", { status: 405 });
    }
    const body = await request.text();
    var ok = false;
    try {
      ok = await verifySignature(env.WHSEC, body, request.headers);
    } catch {
      ok = false;
    }
    if (!ok) {
      return Response.json({ code: 1, message: "bad signature" }, { status: 401 });
    }
    const r = await fetch("https://api.github.com/repos/inchei/inchei.github.io/dispatches", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.GH_PAT,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "User-Agent": "memos-webhook",
      },
      body: JSON.stringify({ event_type: "memos" }),
    });
    if (!r.ok) {
      console.log("github dispatch failed: " + r.status + " body=" + (await r.text().catch(() => "")));
      return Response.json({ code: 1, message: "github " + r.status }, { status: 502 });
    }
    return Response.json({ code: 0, message: "success" });
  },
};

async function verifySignature(secret, body, headers) {
  const id = headers.get("webhook-id");
  const timestamp = headers.get("webhook-timestamp");
  const signatures = headers.get("webhook-signature");
  if (!id || !timestamp || !signatures || !secret) {
    return false;
  }
  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(age) || age > 300) {
    return false;
  }
  const raw = base64UrlDecode(secret.replace(/^whsec_/, "").replace(/\s+/g, ""));
  const key = await crypto.subtle.importKey("raw", raw, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signedContent = id + "." + timestamp + "." + body;
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(signedContent));
  const expected = base64UrlEncode(new Uint8Array(mac));
  return signatures.split(" ").some((s) => timingSafeEqual(expected, s.replace(/^v1,/, "").replace(/=+$/, "")));
}

function base64UrlDecode(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  s += "=".repeat((4 - (s.length % 4)) % 4);
  const binary = atob(s);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

function base64UrlEncode(bytes) {
  let binary = "";
  for (const b of bytes) {
    binary += String.fromCharCode(b);
  }
  return btoa(binary).replace(/=+$/, "");
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
