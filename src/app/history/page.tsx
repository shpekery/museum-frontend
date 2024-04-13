'use client'

import Link from 'next/link'

import { Tabs } from '@radix-ui/react-tabs'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { Image, Skeleton, TabsList, TabsTrigger } from '@/components/ui'
import { Service } from '@/services'
import { cn } from '@/shared/lib'

export default function Page() {
  const { data, isSuccess } = useQuery({
    queryKey: ['history'],
    queryFn: Service.getHistory
  })

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
      <Tabs value="history" className="absolute top-12">
        <TabsList>
          <TabsTrigger value="search" asChild>
            <Link href="/">Поиск предметов</Link>
          </TabsTrigger>
          <TabsTrigger value="history" asChild>
            <Link href="/history">История загрузок</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <h1 className="text-center">История загрузок</h1>
      <p className="lead text-center">
        Здесь сохраняются загруженные музейные предметы
      </p>
      {isSuccess && data.length === 0 && <h4>История отсутствует</h4>}
      <div className="mt-4 grid w-full gap-4 sm:grid-cols-2">
        {isSuccess &&
          data.map(({ photo, id, time_created }) => (
            <Link
              key={id}
              href={`/result/${id}`}
              className={cn(
                'border bg-background px-5 py-4',
                'flex gap-4 rounded-lg'
              )}
            >
              <Image
                src={photo}
                alt={`Изображение ${id}`}
                width="128"
                height="128"
                className="size-20 rounded-md"
                onClick={(e) => e.preventDefault()}
              />
              <div className="space-y-1">
                <h4 className="text-base">Изображение #{id}</h4>
                <p className="text-xs text-muted-foreground">
                  Загружено {dayjs(time_created).format('D MMMM YYYY в H:MM')}
                </p>
              </div>
            </Link>
          ))}

        {!isSuccess &&
          [...Array(10)].map((_, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg border bg-background px-5 py-4"
            >
              <Skeleton className="size-20 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
