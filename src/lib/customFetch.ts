type FetchOptions = Omit<RequestInit, "method" | "body"> & {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any> | string;
};

const customFetch = async <T>(
  endpoint: string,
  { method = "GET", headers = {}, body, ...options }: FetchOptions = {}
): Promise<T> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

    const url = `${baseUrl}${endpoint}`;

    let finalBody = undefined;
    if (body instanceof FormData) {
      finalBody = body; // FormData should not be stringified
    } else if (body) {
      finalBody = JSON.stringify(body); // Default to stringifying JSON bodies
    }

    const response = await fetch(url, {
      method,
      headers: {
        // "Content-Type": "application/json",
        ...headers,
      },
      body: finalBody,
      ...options,
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as T;
  } catch (err) {
    throw err;
  }
};

export default customFetch;
