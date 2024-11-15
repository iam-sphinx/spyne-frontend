'use server';

import { ResponseCookie, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

type Method = 'GET' | 'SET' | 'DEL';

interface HandleCookieResponse {
  success: boolean;
  value?: string | null;
  message?: string;
}

export const handleCookie = async (
  method: Method,
  key: string,
  value?: string,
  options?:Partial<ResponseCookie>,
): Promise<HandleCookieResponse> => {
  try {
    if (!key) {
      throw new Error('Cookie key is required');
    }

    switch (method) {
      case 'GET': {
        const cookieValue = cookies().get(key);
        return {
          success: true,
          value: cookieValue?.value,
        };
      }

      case 'SET': {
        if (!value) {
          throw new Error('Value is required to set a cookie');
        }
        cookies().set(key, value, options);
        return {
          success: true,
          message: `Cookie ${key} set successfully`,
        };
      }

      case 'DEL': {
        cookies().delete(key);
        return {
          success: true,
          message: `Cookie ${key} deleted successfully`,
        };
      }

      default: {
        throw new Error('Invalid method');
      }
    }
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
