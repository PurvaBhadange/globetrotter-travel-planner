// Centralized API Client for GlobeTrotter Frontend

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string | any;
  };
}

export const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("gt-auth-token");
  }
  return null;
};

export const setAuthToken = (token: string | null) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem("gt-auth-token", token);
    } else {
      localStorage.removeItem("gt-auth-token");
    }
  }
};

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `API Error: ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn(`[API FETCH FALLBACK] ${endpoint}:`, err.message);
    throw err;
  }
}
