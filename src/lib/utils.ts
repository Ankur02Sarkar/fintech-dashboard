
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FinanceData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Initial mock data
const mockFinanceData: FinanceData = {
  user: {
    name: "User",
    avatar: "https://cdn-icons-png.flaticon.com/512/1144/1144760.png",
  },
  balance: {
    amount: 4509,
    currency: "₹",
    chartData: [18, 35, 25, 45, 30, 55, 40],
    period: "7 days",
  },
  sells: {
    amount: 1509,
    currency: "₹",
    chartData: [
      { name: "Mon", value: 10 },
      { name: "Tue", value: 30 },
      { name: "Wed", value: 15 },
      { name: "Thu", value: 40 },
      { name: "Fri", value: 30 },
      { name: "Sat", value: 45 },
      { name: "Sun", value: 25 },
    ],
    period: "7 days",
  },
  revenue: {
    amount: 250.09,
    currency: "₹",
    chartData: [
      { name: "Mon", value: 15 },
      { name: "Tue", value: 25 },
      { name: "Wed", value: 35 },
      { name: "Thu", value: 30 },
      { name: "Fri", value: 45 },
      { name: "Sat", value: 25 },
      { name: "Sun", value: 35 },
    ],
    period: "7 days",
  },
  activity: {
    items: [
      {
        name: "Online Shop",
        value: 2509,
        color: "#4270ED",
      },
      {
        name: "Tax",
        value: 350,
        color: "#FF5C8E",
      },
      {
        name: "Food",
        value: 250,
        color: "#FFB74D",
      },
    ],
  },
  sale: {
    highestValue: 25000,
    chartData: [
      { name: "Jan", thisMonth: 5000, lastMonth: 2000 },
      { name: "Feb", thisMonth: 9000, lastMonth: 8000 },
      { name: "Mar", thisMonth: 7000, lastMonth: 12000 },
      { name: "Apr", thisMonth: 15000, lastMonth: 10000 },
      { name: "May", thisMonth: 12000, lastMonth: 15000 },
      { name: "Jun", thisMonth: 16000, lastMonth: 17000 },
      { name: "Jul", thisMonth: 18000, lastMonth: 20000 },
    ],
    period: "7 days",
  },
  payments: {
    percentage: 65,
    successful: 65,
    pending: 35,
  },
  goals: {
    items: [
      {
        name: "Business Funding",
        description: "Finance Goal",
        percentage: 80,
        color: "#4270ED",
      },
      {
        name: "Top Up Balance",
        description: "Finance Update",
        percentage: 70,
        color: "#FF5C8E",
      },
    ],
  },
};

// Helper functions for localStorage
export const financeStorage = {
  getData: (): FinanceData => {
    if (typeof window === "undefined") return mockFinanceData;
    
    const storedData = localStorage.getItem("financeData");
    if (!storedData) {
      localStorage.setItem("financeData", JSON.stringify(mockFinanceData));
      return mockFinanceData;
    }
    
    return JSON.parse(storedData);
  },
  
  saveData: (data: FinanceData): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem("financeData", JSON.stringify(data));
  },
  
  updateData: (partialData: Partial<FinanceData>): FinanceData => {
    const currentData = financeStorage.getData();
    const updatedData = { ...currentData, ...partialData };
    financeStorage.saveData(updatedData);
    return updatedData;
  },
  
  resetData: (): FinanceData => {
    financeStorage.saveData(mockFinanceData);
    return mockFinanceData;
  }
};

// Format currency
export const formatCurrency = (value: number, currency: string = "₹"): string => {
  return `${currency}${value.toLocaleString("en-US", {
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
};

// Format large numbers with K/M suffix
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Calculate average from array
export function calculateAverage(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}

// Get random data for demo purposes
export function getRandomValue(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate gradient ID for SVG elements
export function generateGradientId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
