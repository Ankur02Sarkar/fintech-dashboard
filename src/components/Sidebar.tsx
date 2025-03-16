"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Home, Settings } from "lucide-react";
import { useEffect, useState } from "react";

type SidebarProps = {
  className?: string;
};

const sidebarItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = ({ className }: SidebarProps) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Clean up event listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const sidebarVariants = {
    hidden: isMobile ? { y: 40, opacity: 0 } : { x: -40, opacity: 0 },
    visible: {
      x: isMobile ? 0 : 0,
      y: isMobile ? 0 : 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 10, x: isMobile ? 0 : 0 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      x: 0,
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
        isMobile
          ? "w-full h-[80px] fixed bottom-0 left-0 z-30 bg-white border-t border-gray-100 flex justify-center"
          : "w-[80px] h-full my-auto bg-white flex flex-col items-center py-8 border-r border-gray-100 fixed top-0 left-0 z-30",
        className
      )}
    >
      <nav
        className={cn(
          isMobile
            ? "flex-row flex items-center justify-around w-full px-4"
            : "flex-1 flex flex-col items-center gap-6"
        )}
      >
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
                  <span
                    className={cn(
                      "text-[10px] text-gray-500 transition-all duration-300",
                      isMobile && isActive
                        ? "opacity-100"
                        : "opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    )}
                  >
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
