"use client";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { CopilotPopup } from "@copilotkit/react-ui";
import Form from "./component/Form";
import LineChart from "./component/LineChart";
import BarGraph from "./component/BarChart";
import { RootState } from "@/Redux/Store";
import CardData from "./component/CardData";
import Navbar from "./component/Navbar";

const Page = () => {
    const allData = useSelector((state: RootState) => state.data.allData)
    const [open, setOpen] = useState<boolean>(false)
    const router = useRouter()
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token || token == "undefined") {
            router.push('/login');
        } else {
            router.push("/dashboard")
        }
    }, [token])

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className="flex flex-col h-[100vh] w-[100vw]">
            <Navbar />
            <div className="w-[100%]  flex flex-col p-4 bg-slate-900 ">
                <div className=" w-[100%] flex mb-4">
                    <div className="bg-slate-700 border-spacing-2 p-4 rounded-lg shadow-md h-[60vh] w-[50%] mr-2">
                        <BarGraph data={allData} />
                    </div>

                    <div className="bg-slate-700 border-spacing-2 p-4 rounded-lg shadow-md h-[60vh] w-[50%] mr-2">
                        <LineChart data={allData} />
                    </div>
                </div>

                <CopilotPopup
                    instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                    labels={{
                        title: "Popup Assistant",
                        initial: "Need any help?",
                    }}
                />
                <button
                    className="text-white rounded bg-teal-500 p-2 mb-4 hover:bg-teal-600 w-[10%] flex mx-auto justify-center"
                    onClick={handleClickOpen}>
                    Add New Data
                </button>
                <CardData />
                <Form handleClose={handleClose} open={open} />
            </div>
        </div>
    )
}

export default Page