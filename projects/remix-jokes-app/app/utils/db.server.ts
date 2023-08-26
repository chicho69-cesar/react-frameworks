import { PrismaClient } from '@prisma/client'
import { singleton } from './singleton.server'

export const db = singleton(
  'prisma',
  () => new PrismaClient()
)
