'use client'

import { useEffect, useState } from 'react'

import { FileUploader } from '@/entities/file-uploader'
import { SwitchCard } from '@/entities/switch-card'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'

export default function Home() {
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <main
      className={cn(
        'relative bg-grid-black/[0.025] dark:bg-grid-white/[0.025]'
      )}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)] dark:bg-black" />
      <div
        className={cn(
          'container',
          'py-32',
          'flex flex-col items-center justify-center',
          'gap-6',
          'min-h-screen w-full'
        )}
      >
        <h1 className="text-center">Поиск музейных предметов</h1>
        <p className="lead text-center">
          Загрузите изображение для классификации, автоматического создания
          описания и поиска похожих изображений
        </p>
        <div className="mt-4 flex flex-col gap-6">
          <FileUploader
            maxFiles={1}
            maxSize={8 * 1024 * 1024}
            onValueChange={setFiles}
          />
          <div className="flex w-full flex-col gap-3">
            <SwitchCard>Найти похожие</SwitchCard>
            <SwitchCard>Классифицировать</SwitchCard>
            <SwitchCard>Сгенерировать описание</SwitchCard>
          </div>
        </div>
        <Button disabled size="lg">
          Продолжить
        </Button>
      </div>
    </main>
  )
}
