import React from 'react'
import financeimage from "@/app/public/financeimage.png"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Navbar = () => {
    const router = useRouter()
    const handleLogOut = () => {
        localStorage.removeItem("token")

        router.push("/login")
    }
    return (
        <div>
            <nav className=" w-[100%] h-full flex items-center justify-between p-4 bg-gray-800 text-white ">
                <div className="flex items-center">
                    <Image src={financeimage} alt="Finance Dashboard" height={30} width={40} />
                    <h1 className="ml-4 text-xl font-bold">Finance Dashboard</h1>
                </div>
                <div className="flex space-x-4">
                    <button
                        className="py-2 px-4 rounded bg-red-400 text-white hover:bg-red-600"
                        onClick={handleLogOut}
                        aria-label="Log Out">
                        Log Out
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar