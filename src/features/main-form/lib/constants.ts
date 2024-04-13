import { z } from 'zod'

export const formSchema = z
  .object({
    images: z.array(z.instanceof(File), {
      required_error: 'Загрузите изображение'
    }),
    similar: z.boolean(),
    classify: z.boolean(),
    description: z.boolean()
  })
  .refine(
    ({ similar, classify, description }) => similar || classify || description,
    { message: 'Выберите хотя бы одну опцию' }
  )
