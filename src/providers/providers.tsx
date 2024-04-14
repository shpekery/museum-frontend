'use client'

import React, { type PropsWithChildren, useEffect } from 'react'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { PhotoProvider } from 'react-photo-view'
import { toast } from 'sonner'
import { v4 } from 'uuid'

import { TooltipProvider } from '@/components/ui'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => toast.error(`Произошла ошибка: ${error.message}`)
  }),
  mutationCache: new MutationCache({
    onError: (error) => toast.error(`Произошла ошибка: ${error.message}`)
  })
})

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URI

dayjs.locale('ru')

export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    if (!localStorage.getItem('user-id')) {
      localStorage.setItem('user-id', v4())
    }
  }, [])

  return (
    <TooltipProvider>
      <PhotoProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </PhotoProvider>
    </TooltipProvider>
  )
}
