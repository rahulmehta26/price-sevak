import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export const useApiHealth = () => {
  const [isHealthy, setIsHealthy] = useState<boolean>(true);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await api.get("/health", { timeout: 5000 });
        setIsHealthy(true);
      } catch (error) {
        setIsHealthy(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkHealth();
  }, []);

  return { isHealthy, isChecking };
};
