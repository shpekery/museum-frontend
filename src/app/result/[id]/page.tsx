'use client'

import { useState } from 'react'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, CircleHelp, Copy } from 'lucide-react'
import { toast } from 'sonner'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Image,
  Label,
  Skeleton,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  badgeVariants
} from '@/components/ui'
import { Service } from '@/services'
import { cn } from '@/shared/lib'
import { type Category } from '@/types'

const copyToClipboard = (text: string, success: string = 'Скопировано!') => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success(success)
    },
    (err) => {
      toast.error(`Произошла ошибка!`)
    }
  )
}

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { data, isSuccess } = useQuery({
    queryKey: [`result-${id}`],
    queryFn: () => Service.getItem(parseInt(id))
  })

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
            {!isSuccess && (
              <Skeleton className="aspect-square w-full rounded-md object-cover" />
            )}

            {isSuccess && (
              <Image
                alt="Загруженное изображение"
                className="aspect-square w-full rounded-md"
                height="300"
                src={data.photo}
                width="300"
              />
            )}

            <div className="grid gap-4">
              <div className="flex flex-col items-start gap-3">
                {isSuccess ? (
                  <div className="ju flex w-full items-center gap-1">
                    <Label>Категории</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          className="ml-1 size-auto rounded-full p-1"
                        >
                          <CircleHelp className="size-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="text-sm">
                        Нажмите на тег категории, чтобы скопировать его
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ) : (
                  <Skeleton className="h-4 w-24 rounded-md" />
                )}
                <div className="flex flex-wrap gap-2">
                  {!isSuccess &&
                    [...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-32 rounded-full" />
                    ))}

                  {isSuccess && data.categories.length === 0 && (
                    <span>Отсутствуют</span>
                  )}

                  {isSuccess && <Categories categories={data.categories} />}
                </div>
              </div>
              <div className="grid">
                {isSuccess && (
                  <>
                    <Label
                      htmlFor="description-1"
                      className="mb-2 flex w-full items-center justify-between pl-1"
                    >
                      <span>
                        Описание
                        <span className="ml-2 text-muted-foreground">#1</span>
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 p-2"
                        onClick={() =>
                          copyToClipboard(
                            data.description,
                            'Описание #1 скопировано!'
                          )
                        }
                      >
                        <Copy />
                      </Button>
                    </Label>
                    <Textarea
                      readOnly
                      id="description-1"
                      defaultValue={data.description || 'Отсутствует'}
                      className="min-h-20 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </>
                )}
              </div>
              <div className="grid">
                {isSuccess && (
                  <>
                    <Label
                      htmlFor="description-2"
                      className="mb-2 flex w-full items-center justify-between pl-1"
                    >
                      <span>
                        Описание
                        <span className="ml-2 text-muted-foreground">#2</span>
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-8 p-2"
                        onClick={() =>
                          copyToClipboard(
                            data.description,
                            'Описание #2 скопировано!'
                          )
                        }
                      >
                        <Copy />
                      </Button>
                    </Label>
                    <Textarea
                      readOnly
                      id="description-2"
                      defaultValue={data.description || 'Отсутствует'}
                      className="min-h-20 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {!(isSuccess && data.search_results.length === 0) && (
        <div className="mx-8 max-w-screen-md space-y-5">
          {isSuccess && (
            <>
              <h3 className="text-xl font-semibold leading-none tracking-tight">
                Похожие изображения
              </h3>
              <div className={cn('grid gap-4', 'sm:grid-cols-1')}>
                {data.search_results.map(
                  ({ title, photo, description, categories, id }, i) => (
                    <div
                      key={id}
                      className={cn(
                        'rounded-lg border bg-background px-5 py-4',
                        'grid grid-cols-3 gap-4'
                      )}
                    >
                      <Image
                        alt={`Похожее изображение ${i + 1}`}
                        height="300"
                        src={photo}
                        width="300"
                        className="aspect-video rounded-md"
                      />

                      <div className="col-span-2 space-y-3">
                        <h4 className="text-base">
                          {title === 'None' ? 'Название отсутствует' : title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Categories categories={categories} />
                        </div>
                        <Description>{description}</Description>
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

const Description = ({ children }: { children: string }) => {
  const [open, setOpen] = useState(false)

  return children.length > 256 ? (
    <Collapsible open={open} onOpenChange={setOpen}>
      {!open && (
        <div
          className={cn(
            'max-h-16',
            'select-none text-sm text-muted-foreground',
            '[mask-image:linear-gradient(black,transparent)]'
          )}
        >
          {children}
        </div>
      )}
      <CollapsibleContent className="text-sm text-muted-foreground">
        {children}
        <Button
          className="ml-2 size-auto p-1.5 align-middle"
          variant="outline"
          onClick={() => copyToClipboard(children, 'Описание скопировано!')}
        >
          <Copy className="size-3" />
        </Button>
      </CollapsibleContent>
      <CollapsibleTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          className="mt-2 h-auto px-2 py-0.5"
        >
          {open ? 'Скрыть описание' : 'Показать описание'}
        </Button>
      </CollapsibleTrigger>
    </Collapsible>
  ) : (
    <div className={cn('text-sm text-muted-foreground')}>
      {children}
      <Button
        className="ml-2 size-auto p-1.5 align-middle"
        variant="outline"
        onClick={() => copyToClipboard(children, 'Описание скопировано!')}
      >
        <Copy className="size-3" />
      </Button>
    </div>
  )
}

const Categories = ({ categories }: { categories: Category[] }) => {
  return categories.map(({ name }, i) => (
    <button
      key={i}
      className={badgeVariants({
        variant: i === 0 ? 'default' : i === 1 ? 'secondary' : 'outline'
      })}
      onClick={() => copyToClipboard(name, 'Категория скопирована!')}
    >
      {name}
    </button>
  ))
}
