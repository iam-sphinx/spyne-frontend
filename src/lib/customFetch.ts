type FetchOptions = Omit<RequestInit, "method" | "body"> & {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any> | string | FormData;
};

const customFetch = async <T>(
  endpoint: string,
  { method = "GET", headers = {}, body, ...options }: FetchOptions = {}
): Promise<T> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
    const url = `${baseUrl}${endpoint}`;

    let finalBody = undefined;

    // Handle body depending on its type
    if (body instanceof FormData) {
      finalBody = body; 
    } else if (body) {
      finalBody = JSON.stringify(body); 
    }

    // Conditional Content-Type header based on body type
    const finalHeaders = {
      ...headers,
      ...(body instanceof FormData
        ? {}
        : { "Content-Type": "application/json" }), // Only set Content-Type for non-FormData
    };

    const response = await fetch(url, {
      method,
      headers: finalHeaders,
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
