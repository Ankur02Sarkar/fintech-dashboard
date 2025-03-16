"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, Settings } from "lucide-react";

type SidebarProps = {
  className?: string;
};

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
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
        "w-[80px] bg-white flex flex-col items-center py-8 border-r border-gray-100 fixed top-0 left-0 z-10",
        className
      )}
    >
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
