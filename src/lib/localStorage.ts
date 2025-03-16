// Types for our dashboard data
export interface DashboardData {
  userName: string;
  balance: number;
  sales: number;
  revenue: number;
  activityData: {
    onlineShop: number;
    tax: number;
    misc: number;
  };
  paymentsData: {
    successful: number;
    pending: number;
  };
  goalsData: {
    businessFunding: {
      target: number;
      current: number;
    };
    topUpBalance: {
      target: number;
      current: number;
    };
  };
  saleData: {
    thisMonth: number[];
    lastMonth: number[];
  };
  timeRange: number; // in days
}

// Default data if nothing is in localStorage
const defaultData: DashboardData = {
  userName: "Shahin Alam",
  balance: 4509,
  sales: 1509,
  revenue: 2500.09,
  activityData: {
    onlineShop: 2509,
    tax: 3.50,
    misc: 2.60,
  },
  paymentsData: {
    successful: 65,
    pending: 35,
  },
  goalsData: {
    businessFunding: {
      target: 10000,
      current: 8000,
    },
    topUpBalance: {
      target: 5000,
      current: 4500,
    },
  },
  saleData: {
    thisMonth: [5000, 15000, 10000, 20000, 15000, 10000, 18000],
    lastMonth: [3000, 12000, 18000, 8000, 15000, 10000, 20000],
  },
  timeRange: 7,
};

// Save dashboard data to localStorage
export const saveDashboardData = (data: DashboardData): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }
};

// Get dashboard data from localStorage
export const getDashboardData = (): DashboardData => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('dashboardData');
    return data ? JSON.parse(data) : defaultData;
  }
  return defaultData;
};

// Update specific fields in dashboard data
export const updateDashboardData = (updates: Partial<DashboardData>): DashboardData => {
  const currentData = getDashboardData();
  const updatedData = { ...currentData, ...updates };
  saveDashboardData(updatedData);
  return updatedData;
};

// Reset dashboard data to defaults
export const resetDashboardData = (): void => {
  saveDashboardData(defaultData);
};
