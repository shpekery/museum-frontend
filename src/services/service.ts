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
  }): Promise<string> {
    // const response = await axios.post<string>(
    //   `/produce?is_search=${similar}&is_categorize=${classify}&is_generate_description=${description}`,
    //   {
    //     file: image
    //   }
    // )
    //
    // return response.data

    return 'ебыва'
  }
}
