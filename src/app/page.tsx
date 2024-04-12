'use client'

import { useEffect, useState } from 'react'

import { FileUploader } from '@/entities/file-uploader'
import { cn } from '@/shared/lib'

export default function Home() {
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <main
      className={cn(
        'container',
        'flex flex-col items-center justify-center',
        'gap-6',
        'min-h-screen w-full',
        'text-center'
      )}
    >
      <h1>Поиск музейных предметов</h1>
      <p className="lead">
        Загрузите изображение для классификации, автоматического создания
        описания и поиска похожих изображений
      </p>
      <FileUploader
        maxFiles={1}
        maxSize={8 * 1024 * 1024}
        onValueChange={setFiles}
        className="my-4"
      />
    </main>
  )
}
