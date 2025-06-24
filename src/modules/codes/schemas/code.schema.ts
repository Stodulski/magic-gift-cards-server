import z from 'zod'

export const useCodeSchema = z.object({
  code: z.string().length(6, 'Code length should be 6.'),
  userId: z.string()
})

export const createCodeSchema = z.object({
  code: z.string().length(6, 'Code length should be 6.'),
  email: z.string().email('Invalid email.'),
  name: z.string().min(1, 'Name cannot be empty'),
  locality: z.string().min(1, 'Locality cannot be empty'),
  province: z.string().min(1, 'Province cannot be empty'),
  phone: z.string().min(1, 'Phone cannot be empty'),
  webId: z.string().min(1, 'Order cannot be empty')
})
