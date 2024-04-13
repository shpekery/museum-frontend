'use client'

import React, { type FC, type HTMLProps, useEffect, useState } from 'react'

import { FileUploader } from '@/entities/file-uploader'
import { SwitchCard } from '@/entities/switch-card'
import { Button } from '@/shared/ui'

interface MainFormProps extends HTMLProps<HTMLDivElement> {}

export const MainForm: FC<MainFormProps> = ({ ...props }) => {
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    console.log(files)
  }, [files])

  return (
    <div {...props}>
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

      <Button disabled size="lg">
        Продолжить
      </Button>
    </div>
  )
}
