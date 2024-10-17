import { RootState } from '@/Redux/Store'
import React from 'react'
import { useSelector } from 'react-redux'

const CardData = () => {

    const allData = useSelector((state: RootState) => state.data.allData)
    return (
        <div>
            <div className="flex flex-wrap items-center justify-between">
                <div className="flex flex-wrap justify-center">
                    {allData.map((data) => (
                        <div
                            key={data.id}
                            className="bg-slate-700 p-4 rounded shadow-md m-2 flex flex-col justify-between w-64"
                        >
                            <h3 className="text-lg font-semibold text-white">{data.month}</h3>
                            <p className="text-white">Income: ₹{data.income}</p>
                            <p className="text-white">Expenditure: ₹{data.expenditure}</p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}

export default CardData