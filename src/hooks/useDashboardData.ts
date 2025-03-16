import { useState, useEffect } from 'react';
import { DashboardData, getDashboardData, updateDashboardData } from '@/lib/localStorage';

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== 'undefined') {
      const dashboardData = getDashboardData();
      setData(dashboardData);
      setLoading(false);
    }
  }, []);

  const updateData = (updates: Partial<DashboardData>) => {
    const updatedData = updateDashboardData(updates);
    setData(updatedData);
    return updatedData;
  };

  return {
    data,
    loading,
    updateData
  };
};
