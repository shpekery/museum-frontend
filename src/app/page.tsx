'use client'

import Link from 'next/link'

import { Tabs } from '@radix-ui/react-tabs'

import { MainForm } from '@/components/main-form'
import { TabsList, TabsTrigger } from '@/components/ui'
import { cn } from '@/shared/lib'

export default function Page() {
  return (
    <div
      className={cn(
        'container',
        'py-32',
        'flex flex-col items-center',
        'gap-6',
        'min-h-screen w-full'
      )}
    >
      <Tabs value="search" className="absolute top-12">
        <TabsList>
          <TabsTrigger value="search" asChild>
            <Link href="/">Поиск предметов</Link>
          </TabsTrigger>
          <TabsTrigger value="history" asChild>
            <Link href="/history">История загрузок</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <h1 className="text-center">Поиск музейных предметов</h1>
      <p className="lead text-center">
        Загрузите изображение для классификации, автоматического создания
        описания и поиска похожих изображений
      </p>
      <MainForm />
    </div>
  )
}
