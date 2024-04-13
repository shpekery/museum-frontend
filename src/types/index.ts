export interface Result extends Photo {
  search_results: Photo[]
}

export interface Photo {
  photo: string
  description: string
  categories: string[]
  id: number
}
