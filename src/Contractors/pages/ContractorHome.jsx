import React from 'react'
import ContractorHeader from '../components/ContractorHeader'
import Footer from '../../components/Footer'
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';

function ContractorHome() {

  const pieData = [
    { id: 0, value: 5, label: 'Work Request' },
    { id: 1, value: 12, label: 'Completed' },
    { id: 2, value: 3, label: 'Pending' },
  ];

  const barData = [5, 12, 3];
  const xLabels = ['Request', 'Completed', 'Pending'];

  return (
    <div>
      <ContractorHeader />
      <section className="p-8">
        <h1 className="text-3xl font-bold text-[#660000] mb-10">Contractor Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">

          <div className="bg-blue-100 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <p className="text-black text-sm">Work Request</p>
            <p className="text-4xl font-bold text-black mt-2">5</p>
          </div>

          <div className="bg-green-100 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <p className="text-black text-sm">Work Completed</p>
            <p className="text-4xl font-bold text-black mt-2">12</p>
          </div>

          <div className="bg-yellow-100 shadow-md rounded-xl p-6 text-center hover:shadow-xl transition">
            <p className="text-black text-sm">Pending Approvals</p>
            <p className="text-4xl font-bold text-black mt-2">3</p>
          </div>

        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center">

          {/* PIE CHART */}
          <div className="flex justify-center">
            <PieChart
              series={[
                {
                  data: pieData,
                  innerRadius: 40,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                },
              ]}
              width={350}
              height={300}
            />
          </div>

          {/* BAR CHART */}
          <div className="flex justify-center">
            <BarChart
              xAxis={[{ scaleType: 'band', data: xLabels }]}
              series={[{ data: barData }]}
              width={400}
              height={300}
            />
          </div>

        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ContractorHome
