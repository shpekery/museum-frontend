'use client'

import * as React from 'react'
import { type FC, type HTMLProps } from 'react'

import { useRouter } from 'next/navigation'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { FileUploader } from '@/components/file-uploader'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui'
import { Service } from '@/services'
import { cn } from '@/shared/lib'

import { formSchema } from '../lib/constants'
import { type FormSchema } from '../lib/types'
import { SwitchItem } from './switch-item'

interface MainFormProps extends HTMLProps<HTMLFormElement> {}

export const MainForm: FC<MainFormProps> = ({ className, ...props }) => {
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: Service.process,
    onSuccess: (id) => {
      router.push(`/result?id=${id}`)
    }
  })

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      similar: true,
      classify: true,
      description: true
    }
  })

  const onSubmit = ({ images, ...rest }: FormSchema) => {
    console.log({ ...rest, image: images[0] })
    mutate({ ...rest, image: images[0] })
  }

  const watchFields = form.watch(['similar', 'classify', 'description'])

  const noOptions = !watchFields.some((v) => v)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('flex flex-col items-center gap-8', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onValueChange={field.onChange}
                  maxFiles={1}
                  maxSize={8 * 1024 * 1024}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Настройки</CardTitle>
          </CardHeader>
          <CardContent className="divide-y border-t p-0">
            <FormField
              control={form.control}
              name="similar"
              render={({ field: { value, onChange } }) => (
                <SwitchItem value={value} onChange={onChange}>
                  Найти похожие
                </SwitchItem>
              )}
            />
            <FormField
              control={form.control}
              name="classify"
              render={({ field: { value, onChange } }) => (
                <SwitchItem value={value} onChange={onChange}>
                  Классифицировать
                </SwitchItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <SwitchItem value={value} onChange={onChange}>
                  Сгенерировать описание
                </SwitchItem>
              )}
            />
          </CardContent>
          {noOptions && (
            <p className="px-5 pb-4 text-sm font-medium text-destructive">
              Выберите хотя бы один вариант
            </p>
          )}
        </Card>
        <Button
          type="submit"
          size="lg"
          disabled={noOptions || isPending || form.formState.isValidating}
        >
          {(isPending || form.formState.isValidating) && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Продолжить
        </Button>
      </form>
    </Form>
  )
}
