export const API_URL = 'https://clube-gourmet.vercel.app';

export async function apiGet(path: string, token?: string | null): Promise<any> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { headers });
  return res.json();
}

export async function apiPost(
  path: string,
  body: any,
  token?: string | null
): Promise<{ ok: boolean; data: any }> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return { ok: res.ok, data };
}

export async function apiDelete(
  path: string,
  token?: string | null
): Promise<{ ok: boolean; data: any }> {
  const headers: Record<string, string> = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_URL}${path}`, { method: 'DELETE', headers });
  const data = await res.json();
  return { ok: res.ok, data };
}
