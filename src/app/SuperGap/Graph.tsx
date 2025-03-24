import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '2025',
    Baseline: 0,
    WithoutContributions: 0,
  },
  {
    name: '2026',
    Baseline: 15000,
    WithoutContributions: 22000,
  },
  {
    name: '2027',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2028',
    Baseline: 25000,
    WithoutContributions: 35000,
  },
  {
    name: '2029',
    Baseline: 30000,
    WithoutContributions: 40000,
  },
  {
    name: '2030',
    Baseline: 20000,
    WithoutContributions: 27000,
  }, {
    name: '2031',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2032',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2033',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2034',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2035',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2036',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2037',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2038',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2039',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2040',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2041',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2042',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2043',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2044',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2045',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2046',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2047',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2048',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2049',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2050',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2051',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2043',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2052',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2053',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2054',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2055',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2056',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2057',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2058',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2059',
    Baseline: 20000,
    WithoutContributions: 27000,
  },
  {
    name: '2060',
    Baseline: 20000,
    WithoutContributions: 27000,
  },




];

  const salary = 70000;
  const superRate = 0.115;
  const superTaxRate = 0.15;
  const expectedReturn = 0.07;
  const inflationRate = 0.04;
  const yearsUntilRetirement = 34;
  


  const Graph = () => {
        return (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={500}
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
                <Area type="monotone" dataKey="Baseline" stackId="1" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="WithoutContributions" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                <Area type="monotone" dataKey="WithVoluntary" stackId="1" stroke="#ffc658" fill="#ffc658" />
              </AreaChart>
            </ResponsiveContainer>
          );

  }
  
  export default Graph

