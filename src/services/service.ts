import axios from 'axios'

import { type Result } from '@/types'

export class Service {
  static async process({
    similar,
    classify,
    description,
    image
  }: {
    similar: boolean
    classify: boolean
    description: boolean
    image: File
  }): Promise<number> {
    const form = new FormData()
    form.append('file', image)

    const response = await axios.post<number>(
      `/search_artifact?is_search=${similar}&is_categorize=${classify}&is_generate_description=${description}`,
      form
    )

    return response.data
  }

  static async get(id: number): Promise<Result> {
    const response = await axios.get<Result>(`/search_artifact/${id}`)

    return response.data

    // const photo: Photo = {
    //   photo: '/placeholder.svg',
    //   description:
    //     'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc.',
    //   categories: [
    //     'Класс маленьковый',
    //     'Класс побооооольше',
    //     'Капуц какой большой класс'
    //   ],
    //   id: 1
    // }
    //
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    //
    // return {
    //   ...photo,
    //   search_results: [photo, photo, photo, photo]
    // }
  }
}
