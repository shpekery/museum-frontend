import { type z } from 'zod'

import { type formSchema } from './constants'

export type FormSchema = z.infer<typeof formSchema>
