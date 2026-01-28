import { api } from "../lib/axios";
import type { Alert } from "../types/productTypes";
import { authHeaders } from "./authHeader";

export const getAlerts = async (): Promise<Alert[]> => {
  try {
    const res = await api.get<Alert[]>("/alerts", {
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createAlert = async (
  productId: string,
  targetPrice?: number,
): Promise<Alert> => {
  try {
    const res = await api.post<Alert>(
      "alerts",
      {
        product_id: productId,
        target_price: targetPrice,
      },
      {
        headers: await authHeaders(),
      },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateAlert = async (
  alertId: string,
  updates: {
    is_active?: boolean;
    target_price?: number;
    email_enabled?: boolean;
  },
): Promise<Alert> => {
  try {
    const res = await api.patch<Alert>(`/alerts/${alertId}`, updates, {
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAlert = async (
  alertId: string,
): Promise<{ success: boolean }> => {
  try {
    const res = await api.delete<{ success: boolean }>(`/alerts/${alertId}`, {
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
