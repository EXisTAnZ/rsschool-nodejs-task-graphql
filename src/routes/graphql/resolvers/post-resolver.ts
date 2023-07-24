import { PrismaClient } from "@prisma/client";


export async function getPosts(args, context: { prisma: PrismaClient } ) {
  const posts = await context.prisma.post.findMany();
  return posts;
}

export async function getPost(args: {id: string},  context: { prisma: PrismaClient } ) {
  const post = await context.prisma.post.findUnique({
    where: {
      id: args.id,
    },
  });
  return post;
}

export async function getUserPost(args: {id: string}, _,  context: { prisma: PrismaClient } ) {
  const post = await context.prisma.post.findMany({
    where: {
      authorId: args.id,
    },
  });
  return post;
}