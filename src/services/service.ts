import axios from 'axios'

import { type HistoryResult, type ItemResult } from '@/types'

export class Service {
  static async process({
    similarAndClassify,
    description,
    image
  }: {
    similarAndClassify: boolean
    description: boolean
    image: File
  }): Promise<number> {
    const form = new FormData()
    form.append('file', image)

    const response = await axios.post<number>(
      `/search_artifact?is_search_and_categorize=${similarAndClassify}&is_generate_description=${description}`,
      form
    )

    return response.data
  }

  static async getItem(id: number): Promise<ItemResult> {
    const response = await axios.get<ItemResult>(`/search_artifact/${id}`)

    return response.data
  }

  static async getHistory(): Promise<HistoryResult[]> {
    const response = await axios.get<HistoryResult[]>(
      '/search_artifact/history'
    )

    return response.data
  }
}
