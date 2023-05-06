import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createUser(email: string, name: string, password: string) {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  })

  return user
}