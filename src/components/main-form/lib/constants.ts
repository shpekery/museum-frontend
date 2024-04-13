import { z } from 'zod'

export const formSchema = z
  .object({
    images: z.array(z.instanceof(File), {
      required_error: 'Загрузите изображение'
    }),
    similarAndClassify: z.boolean(),
    description: z.boolean()
  })
  .refine(
    ({ similarAndClassify, description }) => similarAndClassify || description,
    { message: 'Выберите хотя бы один вариант' }
  )
