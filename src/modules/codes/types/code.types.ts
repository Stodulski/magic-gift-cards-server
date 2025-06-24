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
    User: {
        select:{
            id: boolean
            name: boolean
        }
    }
  }
}
