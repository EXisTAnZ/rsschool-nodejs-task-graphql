import { PrismaClient } from "@prisma/client";


export async function getUsers(args, context: { prisma: PrismaClient } ) {
  const users = await context.prisma.user.findMany();
  return users;
}

export async function getUser(args: {id: string},  context: { prisma: PrismaClient } ) {
  const user = await context.prisma.user.findUnique({
    where: {
      id: args.id,
    },
  });
  return user;
}