"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Home,
  Layers,
  CreditCard,
  Clock,
  Calendar,
  Settings,
} from "lucide-react";

type SidebarProps = {
  className?: string;
};

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Layers, label: "Overview", path: "/overview" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
  { icon: Clock, label: "Transactions", path: "/transactions" },
  { icon: Calendar, label: "Budget", path: "/budget" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();

  const sidebarVariants = {
    hidden: { x: -40, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
      className={cn(
        "w-[80px] bg-white flex flex-col items-center py-8 border-r border-gray-100",
        className
      )}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1],
          delay: 0.2,
        }}
        className="w-12 h-12 bg-finance-blue rounded-full flex items-center justify-center mb-12"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4ZM12 4V2M12 22V20M20 12H22M2 12H4M17.6569 6.34315L19.0711 4.92893M4.92893 19.0711L6.34315 17.6569M6.34315 6.34315L4.92893 4.92893M19.0711 19.0711L17.6569 17.6569"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <nav className="flex-1 flex flex-col items-center gap-6">
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.path);

          return (
            <motion.div
              key={item.path}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={childVariants}
            >
              <Link
                href={item.path}
                className="relative group"
                title={item.label}
              >
                <div className="relative flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300",
                      isActive
                        ? "bg-finance-blue text-white"
                        : "text-gray-500 hover:bg-gray-100"
                    )}
                  >
                    <Icon size={22} />
                  </div>
                  <span className="text-[10px] text-gray-500 opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {item.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
