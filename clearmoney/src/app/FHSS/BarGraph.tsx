// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const data = [
  {
    name: "FHSS",
    Baseline: 30000,
    WithoutContributions: 40000,
  },
  {
    name: "Savings Account",
    Baseline: 15000,
    WithoutContributions: 22000,
  },
];

const BarGraph = ({}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart
      width={200}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar
        type="monotone"
        dataKey="Baseline"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Bar
        type="monotone"
        dataKey="WithoutContributions"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      />
      <Bar
        type="monotone"
        dataKey="WithVoluntary"
        stackId="1"
        stroke="#ffc658"
        fill="#ffc658"
      />
    </BarChart>
  </ResponsiveContainer>
);

export default BarGraph;
