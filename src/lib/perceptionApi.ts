export async function submitPerception(responses: Record<string, unknown>) {
  const url =
    import.meta.env.VITE_PERCEPTION_API_URL ||
    "/api/perception";
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ responses }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error || `Erreur API (${res.status})`);
  }
  return (await res.json()) as { success: boolean };
}


