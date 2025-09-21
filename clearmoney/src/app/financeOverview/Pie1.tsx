import React, { useState, useCallback } from "react";
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    midAngle,
    index
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + cos * 10; // Moves outward smoothly
  const sy = cy + sin * 10;
  const color = COLORS[index % COLORS.length]; // Assign correct color

  return (
    <motion.g
      animate={{ translateX: cos * 12, translateY: sin * 12, scale: 1.07}} // Moves outward smoothly
      transition={{ type: "spring", stiffness: 150, damping: 10, duration: 1, mass: 1.2}}
      
    >
{data.map((entry, index) => (
      <Sector
      cx={sx}
      cy={sy}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 10} // Expands outward
      startAngle={startAngle}
      endAngle={endAngle}
      fill={COLORS[2]} // Uses correct color
    />
          ))}
    </motion.g>
  );
};

const Pie1 = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onMouseOver = useCallback((_, index) => {
    setActiveIndex(index);
  }, []);

  const onMouseLeave = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={"80%"}
          fill="#8884d8"
          activeShape={renderActiveShape} // Custom rising effect
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Pie1;
