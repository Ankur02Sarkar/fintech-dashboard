"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ProgressBar from "./ui/ProgressBar";
import { financeStorage, formatCurrency } from "@/lib/utils";
import { FinanceData } from "@/lib/types";
import Card from "./ui/card";

const Dashboard = () => {
  const [data, setData] = useState<FinanceData | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const financeData = financeStorage.getData();
    setData(financeData);
  }, []);

  // Don't render anything on server to avoid hydration mismatch
  if (!isClient || !data) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerAnimation}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div
          variants={itemAnimation}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
        >
          <div>
            <h1 className="text-2xl font-semibold mb-1">
              Hi, {data.user.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Here is flat update from your payment channels, that is really
              important for you to catch up.
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </div>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Balance Card */}
          <motion.div variants={itemAnimation}>
            <Card className="bg-blue-600 text-white">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium opacity-80">
                    Balance
                  </span>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {data.balance.period}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {formatCurrency(data.balance.amount)}
                </h3>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={data.balance.chartData.map((value, index) => ({
                        name: index,
                        value,
                      }))}
                    >
                      <defs>
                        <linearGradient
                          id="balanceGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={2}
                        fill="url(#balanceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sales Card */}
          <motion.div variants={itemAnimation}>
            <Card className="bg-white dark:bg-gray-800">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Sales
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {data.sells.period}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {formatCurrency(data.sells.amount)}
                </h3>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.sells.chartData}>
                      <defs>
                        <linearGradient
                          id="sellsGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#FF5C8E"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="#FF5C8E"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#FF5C8E"
                        strokeWidth={2}
                        fill="url(#sellsGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Revenue Card */}
          <motion.div variants={itemAnimation}>
            <Card className="bg-white dark:bg-gray-800">
              <div className="flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Revenue
                  </span>
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {data.revenue.period}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {formatCurrency(data.revenue.amount)}
                </h3>
                <div className="h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.revenue.chartData}>
                      <defs>
                        <linearGradient
                          id="revenueGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#FFB74D"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="#FFB74D"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#FFB74D"
                        strokeWidth={2}
                        fill="url(#revenueGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Activity */}
          <motion.div variants={itemAnimation}>
            <Card
              title="Activity"
            //   titleAction={
            //     <button className="text-gray-400 hover:text-gray-600">
            //       <svg
            //         xmlns="http://www.w3.org/2000/svg"
            //         className="h-5 w-5"
            //         viewBox="0 0 20 20"
            //         fill="currentColor"
            //       >
            //         <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            //       </svg>
            //     </button>
            //   }
              className="col-span-1"
            >
              <div className="flex justify-center">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data.activity.items}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) =>
                          `${name}: ${formatCurrency(value)}`
                        }
                      >
                        {data.activity.items.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {data.activity.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Sale Chart */}
          <motion.div
            variants={itemAnimation}
            className="col-span-1 md:col-span-2"
          >
            <Card
              title="Sale"
              titleAction={
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {data.sale.period}
                  </span>
                  {/* <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button> */}
                </div>
              }
            >
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.sale.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, data.sale.highestValue]} />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="thisMonth"
                      stroke="#4270ED"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                      name="This Month"
                    />
                    <Line
                      type="monotone"
                      dataKey="lastMonth"
                      stroke="#FF5C8E"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      name="Last Month"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center justify-center space-x-8">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    This Month
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pink-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Last Month
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Third Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Payments */}
          <motion.div variants={itemAnimation}>
            <Card
              title="Payments"
            //   titleAction={
            //     <button className="text-gray-400 hover:text-gray-600">
            //       <svg
            //         xmlns="http://www.w3.org/2000/svg"
            //         className="h-5 w-5"
            //         viewBox="0 0 20 20"
            //         fill="currentColor"
            //       >
            //         <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            //       </svg>
            //     </button>
            //   }
            >
              <div className="flex justify-center mb-6">
                <div className="w-40 h-40 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: "Successful",
                            value: data.payments.successful,
                          },
                          { name: "Pending", value: data.payments.pending },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                      >
                        <Cell fill="#4270ED" />
                        <Cell fill="#FFB74D" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-bold">
                      {data.payments.percentage}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-8">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Successful
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Pending
                  </span>
                </div>
              </div>
              <div className="mt-4 text-xs text-center text-gray-500">
                *average has been counted carefully
              </div>
            </Card>
          </motion.div>

          {/* Goals */}
          <motion.div variants={itemAnimation}>
            <Card
              title="Goals"
            //   titleAction={
            //     <button className="text-gray-400 hover:text-gray-600">
            //       <svg
            //         xmlns="http://www.w3.org/2000/svg"
            //         className="h-5 w-5"
            //         viewBox="0 0 20 20"
            //         fill="currentColor"
            //       >
            //         <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            //       </svg>
            //     </button>
            //   }
            >
              <div className="space-y-6">
                {data.goals.items.map((goal, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {goal.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {goal.description}
                        </p>
                      </div>
                      <div className="bg-white dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
                        <span
                          className="text-sm font-medium"
                          style={{ color: goal.color }}
                        >
                          {goal.percentage}%
                        </span>
                      </div>
                    </div>
                    <ProgressBar
                      value={goal.percentage}
                      max={100}
                      color={goal.color}
                      showPercentage={false}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
