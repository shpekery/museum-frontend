'use client'

import * as React from 'react'
import { type FC, type HTMLProps } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'

import { FileUploader } from '@/entities/file-uploader'
import { SwitchItem } from '@/features/main-form/ui/switch-item'
import { cn } from '@/shared/lib'
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
} from '@/shared/ui'

import { formSchema } from '../lib/constants'

interface MainFormProps extends HTMLProps<HTMLFormElement> {}

export const MainForm: FC<MainFormProps> = ({ className, ...props }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      similar: true,
      classify: true,
      description: true
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
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
              Выберите хотя бы одну опцию
            </p>
          )}
        </Card>
        <Button type="submit" size="lg" disabled={noOptions}>
          Продолжить
        </Button>
      </form>
    </Form>
  )
}
