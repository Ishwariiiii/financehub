"use client";
import { Field, Form, Formik, ErrorMessage } from "formik"
import * as Yup from 'yup'
import { registerUser, verifyEmail } from "@/Redux/Slice/AuthSlice"
import { useEffect } from 'react'
import { useRouter } from "next/navigation"
import {  AppDispatch, RootState } from "@/Redux/Store"
import { useSelector, useDispatch } from "react-redux"

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),

    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),

    password: Yup.string()
        .min(6, 'Password too short')
        .required('Password is required'),
})

interface RegisterFormValues {
    name: string
    email: string
    password: string
}

export default function Page() {
    const router = useRouter()
    const dispatch  = useDispatch<AppDispatch>()
    const { signupData, emailVerificationSuccess } = useSelector((state: RootState) => state.auth)
    console.log('Registration successful:', signupData)

    const handleEmailVerification = () => {
        if (!signupData) return
        const verification = {
            id: signupData.id,
            token: signupData.emailVerificationTOken,  
        }

        dispatch(verifyEmail(verification))
    }

    useEffect(() => {
        if (emailVerificationSuccess) {
            router.push('/login')
        }
    }, [emailVerificationSuccess, router])

    return (
        <div className="flex justify-center items-center h-screen bg-slate-900">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-semibold text-center mb-6">Registration Page</h1>
                <Formik
                    initialValues={{ name: '', email: '', password: '' } as RegisterFormValues}
                    validationSchema={RegisterSchema}
                    onSubmit={(values) => {
                        dispatch(registerUser(values));
                    }}
                >
                    {({ handleChange, handleSubmit }) => (
                        <Form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <button type="submit" className="w-full bg-slate-600 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-200">
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
                <button type="submit" onClick={handleEmailVerification} className='w-full bg-gray-500 py-2 text-white rounded-lg hover:bg-slate-600 transition duration-200 mt-4'>
                    Email verification after Registration
                </button>
            </div>
        </div>
    )
}
