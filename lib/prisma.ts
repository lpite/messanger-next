import { PrismaClient } from '@prisma/client'


declare global {
  var prisma: PrismaClient
}


if(!global.prisma){
	const prisma = new PrismaClient()
	global.prisma = prisma;

}

export default global.prisma;

