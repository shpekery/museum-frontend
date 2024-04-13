'use client'

import React, { type PropsWithChildren } from 'react'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`Произошла ошибка: ${error.message}`)
  }),
  mutationCache: new MutationCache({
    onError: (error) => toast.error(`Произошла ошибка: ${error.message}`)
  })
})

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URI

export const QueryProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
