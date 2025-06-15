import { useAuth } from "@clerk/nextjs";

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const { getToken } = useAuth();
  const token = await getToken();
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
}
