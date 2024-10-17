import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FinancialData {
    id: number
    month: string
    income: number
    expenditure: number
}

interface DataState {
    allData: FinancialData[]
}

const initialState: DataState = {
    allData: [
        { id: 1, month: 'January', income: 500, expenditure: 300 },
        { id: 2, month: 'February', income: 1000, expenditure: 800 },
        { id: 3, month: 'March', income: 800, expenditure: 1000 },
        { id: 4, month: 'April', income: 1500, expenditure: 1300 },
    ],
}

const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        showData: (state, action) => {
            return {
                ...state,
                allData: [action.payload]
            }
        },
        createData: (state, action) => {
            console.log(action.payload, "data slice");

            // const search = state.allData.find(
            //     (item) => item.month == action.payload.month
            // )
            // if (search) {
            //     search.income = action.payload.income;
            //     search.expenditure = action.payload.expenditure;
            // } else {
            //     state.allData.push(action.payload);
            // }

            const updatedData = state.allData.map(item => 
                item.month == action.payload.month ? { ...item, income: action.payload.income, expenditure: action.payload.expenditure } : item
            )
            const search = state.allData.find(item => item.month == action.payload.month);
            
            if (!search) {
                updatedData.push(action.payload);
            }
            
            state.allData = updatedData;
        },
    },
})

export const { showData, createData } = dataSlice.actions
export const dataReducer = dataSlice.reducer
