
export interface FinanceData {
  user: User;
  balance: BalanceData;
  sells: SellsData;
  revenue: RevenueData;
  activity: ActivityData;
  sale: SaleData;
  payments: PaymentsData;
  goals: GoalsData;
}

export interface User {
  name: string;
  avatar: string;
}

export interface BalanceData {
  amount: number;
  currency: string;
  chartData: number[];
  period: string;
}

export interface SellsData {
  amount: number;
  currency: string;
  chartData: { name: string; value: number }[];
  period: string;
}

export interface RevenueData {
  amount: number;
  currency: string;
  chartData: { name: string; value: number }[];
  period: string;
}

export interface ActivityData {
  items: {
    name: string;
    value: number;
    color: string;
  }[];
}

export interface ChartDataPoint {
  name: string;
  thisMonth: number;
  lastMonth: number;
}

export interface SaleData {
  highestValue: number;
  chartData: ChartDataPoint[];
  period: string;
}

export interface PaymentsData {
  percentage: number;
  successful: number;
  pending: number;
}

export interface Goal {
  name: string;
  description: string;
  percentage: number;
  color: string;
}

export interface GoalsData {
  items: Goal[];
}
