
import { useMemo } from 'react';
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { generateGradientId } from '@/lib/utils';
import { motion } from 'framer-motion';

type LineChartProps = {
  data: any[];
  height?: number;
  colors?: {
    thisMonth: string;
    lastMonth: string;
  };
  showTooltip?: boolean;
  showAxis?: boolean;
  animated?: boolean;
};

const LineChart = ({
  data,
  height = 300,
  colors = {
    thisMonth: "#4270ED",
    lastMonth: "#FF5C8E"
  },
  showTooltip = true,
  showAxis = true,
  animated = true
}: LineChartProps) => {
  const gradientIdThis = useMemo(() => generateGradientId('lineGradientThis'), []);
  const gradientIdLast = useMemo(() => generateGradientId('lineGradientLast'), []);

  const chartVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { 
      opacity: 1, 
      pathLength: 1,
      transition: { 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
      >
        <defs>
          <linearGradient id={gradientIdThis} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.thisMonth} stopOpacity={0.2} />
            <stop offset="95%" stopColor={colors.thisMonth} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={gradientIdLast} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.lastMonth} stopOpacity={0.2} />
            <stop offset="95%" stopColor={colors.lastMonth} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        {showAxis && (
          <>
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#9CA3AF' }}
              axisLine={false}
              tickLine={false}
              width={40}
            />
          </>
        )}
        
        {showTooltip && (
          <Tooltip 
            cursor={false}
            contentStyle={{ 
              backgroundColor: 'white', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              border: 'none',
              padding: '8px 12px'
            }}
          />
        )}
        
        <Line 
          type="monotone" 
          dataKey="thisMonth" 
          stroke={colors.thisMonth} 
          strokeWidth={3}
          dot={{ 
            r: 4, 
            strokeWidth: 2,
            fill: 'white',
            stroke: colors.thisMonth
          }}
          activeDot={{ 
            r: 6, 
            strokeWidth: 0,
            fill: colors.thisMonth
          }}
          isAnimationActive={animated}
        />
        
        <Line 
          type="monotone" 
          dataKey="lastMonth" 
          stroke={colors.lastMonth} 
          strokeWidth={3}
          strokeDasharray="5 5"
          dot={{ 
            r: 4, 
            strokeWidth: 2,
            fill: 'white',
            stroke: colors.lastMonth
          }}
          activeDot={{ 
            r: 6, 
            strokeWidth: 0,
            fill: colors.lastMonth
          }}
          isAnimationActive={animated}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
