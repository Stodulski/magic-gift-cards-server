export type PaginationOptions = {
  take: number
  cursor?: { id: number }
  skip?: number
  orderBy: {
    id: 'asc' | 'desc'
  }
  select:{
    id: boolean
    code: boolean
    usedAt: boolean
    Place: {
        select:{
            id: boolean
            name: boolean
        }
    }
  }
}
