"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useRouter()
  return (
    <div className="h-screen flex items-center justify-center bg-slate-700">
      <button className="bg-slate-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-slate-800" onClick={() => router.push('/login')}>
        Go to Login
      </button>
    </div>

  );
}

export default Page;
