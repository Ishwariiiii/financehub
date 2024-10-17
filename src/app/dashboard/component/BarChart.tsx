import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
)

interface DataPoint {
  id: number;
  month: string;
  income: number;
  expenditure: number;
}

interface BarGraphProps {
  data: DataPoint[];
}

const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Income',
        data: data.map((item) => item.income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expenditure',
        data: data.map((item) => item.expenditure),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  )
}
export default BarGraph;