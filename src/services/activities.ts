import { api } from "../lib/axios";
import type { Activity } from "../types/productTypes";
import { authHeaders } from "./authHeader";

export const getActivities = async (
  limit = 50,
  offset = 0,
): Promise<Activity[]> => {
  try {
    const res = await api.get<Activity[]>("/activities", {
      params: { limit, offset },
      headers: await authHeaders(),
    });

    return res.data;
  } catch (error) {
    console.error("Get activities error:", error);
    throw error;
  }
};

export const getGroupedActivities = async (): Promise<
  { date: string; activities: Activity[] }[]
> => {
  try {
    const res = await api.get<{ date: string; activities: Activity[] }[]>(
      "/activities/grouped",
      {
        headers: await authHeaders(),
      },
    );

    return res.data;
  } catch (error) {
    console.error("Get grouped activities error:", error);
    throw error;
  }
};
