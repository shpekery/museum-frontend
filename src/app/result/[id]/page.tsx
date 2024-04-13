'use client'

import Link from 'next/link'

import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { toast } from 'sonner'

import {
  type BadgeProps,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Image,
  Label,
  Skeleton,
  Textarea,
  badgeVariants
} from '@/components/ui'
import { Service } from '@/services'
import { cn } from '@/shared/lib'

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
  const { data, isPending, isError } = useQuery({
    queryKey: [`result-${id}`],
    queryFn: () => Service.get(parseInt(id))
  })

  if (isError) {
    return null
  }

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
            {isPending && (
              <Skeleton className="aspect-square w-full rounded-md object-cover" />
            )}

            {!isPending && (
              <Image
                alt="Загруженное изображение"
                className="aspect-square w-full rounded-md object-cover"
                height="300"
                src={data.photo}
                width="300"
              />
            )}

            <div className="grid gap-6">
              <div className="flex flex-col items-start gap-3">
                {!isPending ? (
                  <Label>Категории</Label>
                ) : (
                  <Skeleton className="h-4 w-24 rounded-md" />
                )}
                <div className="flex flex-wrap gap-2">
                  {isPending &&
                    [...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-6 w-32 rounded-full" />
                    ))}

                  {!isPending && data.categories.length === 0 && (
                    <span>Отсутствуют</span>
                  )}

                  {!isPending &&
                    data.categories.map((item, i) => (
                      <button
                        key={i}
                        className={badgeVariants({
                          variant: ['default', 'secondary', 'outline'][
                            i
                          ] as BadgeProps['variant']
                        })}
                        onClick={() =>
                          copyToClipboard(item, 'Категория скопирована!')
                        }
                      >
                        {item}
                      </button>
                    ))}
                </div>
              </div>
              <div className="grid gap-3">
                {!isPending ? (
                  <Label htmlFor="description">Описание</Label>
                ) : (
                  <Skeleton className="h-4 w-24 rounded-md" />
                )}
                {isPending && (
                  <>
                    <Skeleton className="h-32 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </>
                )}

                {!isPending && (
                  <>
                    <Textarea
                      readOnly
                      id="description"
                      defaultValue={data.description || 'Отсутствует'}
                      className="min-h-32 resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                      disabled={!data.description}
                      onClick={() =>
                        copyToClipboard(
                          data.description,
                          'Описание скопировано!'
                        )
                      }
                    >
                      Скопировать
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {!(!isPending && data.search_results.length === 0) && (
        <Card className="mx-8 w-full max-w-screen-lg">
          <CardHeader>
            <CardTitle>Похожие изображения</CardTitle>
          </CardHeader>
          <CardContent
            className={cn('grid gap-8', 'grid-cols-2 sm:grid-cols-3')}
          >
            {isPending &&
              [...Array(3)].map((_, i) => (
                <Skeleton
                  key={1}
                  className="aspect-square w-full rounded-md object-cover"
                />
              ))}

            {!isPending &&
              data.search_results.map(({ photo }, i) => (
                <Image
                  key={i + 1}
                  alt={`Похожее изображение ${i + 1}`}
                  className="aspect-square w-full rounded-md object-cover"
                  height="300"
                  src={photo}
                  width="300"
                />
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
