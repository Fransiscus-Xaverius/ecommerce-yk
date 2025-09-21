/**
 * Simple API client wrapper around fetch for consistent error handling
 */
export async function apiClient(path, { method = "GET", headers = {}, body, ...rest } = {}) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  };
  if (body) {
    options.body = typeof body === "string" ? body : JSON.stringify(body);
  }

  const res = await fetch(path, options);
  let json;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  if (!res.ok) {
    const message = json?.message || `HTTP ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.payload = json;
    throw error;
  }
  return json;
}

export const get = (path, opts) => apiClient(path, { ...opts, method: "GET" });
export const post = (path, body, opts) => apiClient(path, { ...opts, method: "POST", body });
