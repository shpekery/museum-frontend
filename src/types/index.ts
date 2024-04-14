export interface ItemResult extends Omit<Photo, 'description'> {
  description: string[]
  search_results: Photo[]
}

export interface Photo {
  title: string | null
  photo: string
  description: string
  categories: Category[]
  id: number
}

export interface HistoryResult {
  photo: string
  time_created: string
  id: 0
}

export interface Category {
  name: string
  accuracy: number
}
