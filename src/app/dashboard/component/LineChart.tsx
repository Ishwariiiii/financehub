import React from 'react'
import { Line } from 'react-chartjs-2'
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
  month: string
  income: number
  expenditure: number
}

interface Props {
  data: DataPoint[]
}

const LineChart: React.FC<Props> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: 'Income',
        data: data.map((item) => item.income),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Expenditure',
        data: data.map((item) => item.expenditure),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
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
      <Line data={chartData} options={options} />
    </div>
  )
}

export default LineChart;
