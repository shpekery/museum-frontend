'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'

import { cn } from '@/shared/lib'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
  Textarea
} from '@/shared/ui'

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success('Скопировано!')
    },
    (err) => {
      toast.error(`Произошла ошибка!`)
    }
  )
}

export default function Page() {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.'

  return (
    <div
      className={cn(
        'py-32',
        'flex flex-col items-center',
        'gap-12',
        'min-h-screen w-full'
      )}
    >
      <div className="container">
        <Link href="/" className="mb-6 flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <div>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Назад</span>
            </div>
          </Button>
          <span className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Назад
          </span>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Результат обработки</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8 sm:grid-cols-2">
            <Image
              alt="Загруженное изображение"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src="/placeholder.svg"
              width="300"
            />

            <div className="grid gap-6">
              <div className="flex flex-col items-start gap-3">
                <Label>Классификация</Label>
                <Badge>Класс</Badge>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  readOnly
                  id="description"
                  defaultValue={text}
                  className="min-h-32 resize-none"
                />
                <Button onClick={() => copyToClipboard(text)}>
                  Скопировать
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mx-8 max-w-screen-lg">
        <CardHeader>
          <CardTitle>Похожие изображения</CardTitle>
        </CardHeader>
        <CardContent
          className={cn(
            'grid gap-8',
            'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
          )}
        >
          {[...Array(16)].map((_, i) => (
            <Image
              key={i + 1}
              alt={`Похожее изображение ${i + 1}`}
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src="/placeholder.svg"
              width="300"
            />
          ))}
        </CardContent>
      </Card>
    </div>
  )
}