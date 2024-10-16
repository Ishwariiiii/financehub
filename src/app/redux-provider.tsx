'use client';
import { AppStore, store } from '@/Redux/Store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function ReduxProvider({ children }: { children:React.ReactNode}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
  
    storeRef.current = store()
  }
  return <Provider store={storeRef.current}>{children}</Provider>
}
