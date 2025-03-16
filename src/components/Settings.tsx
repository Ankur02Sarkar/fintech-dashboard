"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { financeStorage } from "@/lib/utils";
import { FinanceData } from "@/lib/types";
import GlassmorphicPopup from "./ui/GlassmorphicPopup";

const Settings = () => {
  const [data, setData] = useState<FinanceData | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const financeData = financeStorage.getData();
    setData(financeData);
  }, []);

  const handleInputChange = (
    section: keyof FinanceData,
    field: string,
    value: unknown
  ) => {
    if (!data) return;

    const newData = { ...data };

    // Handle nested properties
    if (field.includes(".")) {
      const [parentField, childField] = field.split(".");
      (newData[section] as any)[parentField][childField] = value;
    } else {
      (newData[section] as any)[field] = value;
    }

    setData(newData);
  };

  const handleArrayChange = (
    section: keyof FinanceData,
    arrayField: string,
    index: number,
    field: string,
    value: any
  ) => {
    if (!data) return;

    const newData = { ...data };
    (newData[section] as any)[arrayField][index][field] = value;

    setData(newData);
  };

  const handleSave = () => {
    if (!data) return;

    financeStorage.saveData(data);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handleReset = () => {
    const resetData = financeStorage.resetData();
    setData(resetData);
    setShowResetConfirm(false);
  };

  // Don't render anything on server to avoid hydration mismatch
  if (!isClient || !data) {
    return <div className="p-4">Loading settings...</div>;
  }

  return (
    <div className="p-4 md:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-2">Dashboard Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Customize your dashboard data and appearance. All changes will be
            saved to localStorage.
          </p>
        </div>

        {/* User Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">User Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={data.user.name}
                onChange={(e) =>
                  handleInputChange("user", "name", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Avatar URL
              </label>
              <input
                type="text"
                value={data.user.avatar}
                onChange={(e) =>
                  handleInputChange("user", "avatar", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Balance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Balance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={data.balance.amount}
                onChange={(e) =>
                  handleInputChange("balance", "amount", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency
              </label>
              <input
                type="text"
                value={data.balance.currency}
                onChange={(e) =>
                  handleInputChange("balance", "currency", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Period
              </label>
              <select
                value={data.balance.period}
                onChange={(e) =>
                  handleInputChange("balance", "period", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              >
                <option value="7 days">7 days</option>
                <option value="14 days">14 days</option>
                <option value="30 days">30 days</option>
                <option value="90 days">90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sales Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Sales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={data.sells.amount}
                onChange={(e) =>
                  handleInputChange("sells", "amount", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Period
              </label>
              <select
                value={data.sells.period}
                onChange={(e) =>
                  handleInputChange("sells", "period", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              >
                <option value="7 days">7 days</option>
                <option value="14 days">14 days</option>
                <option value="30 days">30 days</option>
                <option value="90 days">90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Revenue Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Revenue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={data.revenue.amount}
                onChange={(e) =>
                  handleInputChange("revenue", "amount", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Period
              </label>
              <select
                value={data.revenue.period}
                onChange={(e) =>
                  handleInputChange("revenue", "period", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              >
                <option value="7 days">7 days</option>
                <option value="14 days">14 days</option>
                <option value="30 days">30 days</option>
                <option value="90 days">90 days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payments Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Payments</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Successful (%)
              </label>
              <input
                type="number"
                value={data.payments.successful}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  handleInputChange("payments", "successful", value);
                  handleInputChange("payments", "pending", 100 - value);
                  handleInputChange("payments", "percentage", value);
                }}
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Pending (%)
              </label>
              <input
                type="number"
                value={data.payments.pending}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Goals Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Goals</h2>
          {data.goals.items.map((goal, index) => (
            <div
              key={index}
              className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <h3 className="text-md font-medium mb-3">Goal {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={goal.name}
                    onChange={(e) =>
                      handleArrayChange(
                        "goals",
                        "items",
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={goal.description}
                    onChange={(e) =>
                      handleArrayChange(
                        "goals",
                        "items",
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Percentage
                  </label>
                  <input
                    type="number"
                    value={goal.percentage}
                    onChange={(e) =>
                      handleArrayChange(
                        "goals",
                        "items",
                        index,
                        "percentage",
                        Number(e.target.value)
                      )
                    }
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Color
                  </label>
                  <div className="flex items-center">
                    <input
                      type="color"
                      value={goal.color}
                      onChange={(e) =>
                        handleArrayChange(
                          "goals",
                          "items",
                          index,
                          "color",
                          e.target.value
                        )
                      }
                      className="w-10 h-10 rounded-md border border-gray-300 dark:border-gray-600 mr-2"
                    />
                    <input
                      type="text"
                      value={goal.color}
                      onChange={(e) =>
                        handleArrayChange(
                          "goals",
                          "items",
                          index,
                          "color",
                          e.target.value
                        )
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Reset to Default
          </button>
          <motion.button
            onClick={handleSave}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Changes
          </motion.button>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Settings saved successfully!
          </motion.div>
        )}

        {/* Reset Confirmation Popup */}
        <GlassmorphicPopup
          isOpen={showResetConfirm}
          onClose={() => setShowResetConfirm(false)}
          title="Reset to Default"
        >
          <div className="text-center">
            <p className="mb-4">
              Are you sure you want to reset all settings to default? This
              action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 rounded-md shadow-sm text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Reset
              </button>
            </div>
          </div>
        </GlassmorphicPopup>
      </div>
    </div>
  );
};

export default Settings;
