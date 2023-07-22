import { PrismaClient } from "@prisma/client";


export async function getPosts(args, context: { prisma: PrismaClient } ) {
  const users = await context.prisma.post.findMany();
  return users;
}

export async function getPost(args: {id: string},  context: { prisma: PrismaClient } ) {
  const user = await context.prisma.post.findUnique({
    where: {
      id: args.id,
    },
  });
  return user;
}