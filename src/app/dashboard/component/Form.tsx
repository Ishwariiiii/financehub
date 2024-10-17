"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material"
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/Redux/Store'
import { createData } from '@/Redux/Slice/dataSlice'
import { toast } from 'react-toastify'

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

interface FormProps {
    handleClose: () => void;
    open: boolean;
}

const Form: React.FC<FormProps> = ({ handleClose, open }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [incomeInput, setIncomeInput] = useState<string>("")
    const [expenditureInput, setExpenditureInput] = useState<string>("")
    const [monthInput, setMonthInput] = useState<string>("")

    const handleDataSubmit = () => {
        const income = Number(incomeInput)
        const expenditure = Number(expenditureInput)

        if (!incomeInput || !expenditureInput || !monthInput) {
            toast.error("All fields are required")
        } else {
            dispatch(createData({
                month: monthInput,
                income,
                expenditure
            }))
            setIncomeInput("")
            setExpenditureInput("")
            setMonthInput("")
            handleClose()
        }

    }
    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                <DialogTitle>Add New Data</DialogTitle>
                <DialogContent>
                    <form className="flex flex-col">
                        <select
                            value={monthInput}
                            onChange={(e) => setMonthInput(e.target.value)}
                            className="mb-4 p-2 border rounded h-16"
                            required
                        >
                            <option value="" disabled>Select Month</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                        <TextField
                            label="Income"
                            type="number"
                            value={incomeInput}
                            onChange={(e) => setIncomeInput(e.target.value)}
                            required
                        />
                        <TextField
                            label="Expenditure"
                            type="number"
                            value={expenditureInput}
                            onChange={(e) => setExpenditureInput(e.target.value)}
                            sx={{ marginTop: "2vh" }}
                            required
                        />
                        <DialogActions>
                            <Button onClick={handleDataSubmit} color="primary" sx={{ backgroundColor: "green", color: "black" }}>Add</Button>
                            <Button onClick={handleClose} color="primary" sx={{ backgroundColor: "red", color: "black" }}>Cancel</Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Form
