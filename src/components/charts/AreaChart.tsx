
import { useMemo } from 'react';
import { Area, AreaChart as RechartsAreaChart, ResponsiveContainer } from 'recharts';
import { generateGradientId } from '@/lib/utils';

type AreaChartProps = {
  data: any[];
  height?: number;
  dataKey?: string;
  color?: string;
  animated?: boolean;
};

const AreaChart = ({
  data,
  height = 100,
  dataKey = "value",
  color = "#4270ED",
  animated = true
}: AreaChartProps) => {
  const gradientId = useMemo(() => generateGradientId('areaGradient'), []);

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsAreaChart
        data={data}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={3}
          fill={`url(#${gradientId})`}
          isAnimationActive={animated}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
