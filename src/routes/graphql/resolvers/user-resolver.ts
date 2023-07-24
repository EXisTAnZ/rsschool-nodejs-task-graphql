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

export async function getSubscriptions(args: {id: string},  context: { prisma: PrismaClient }) {
  const subscriptions = await context.prisma.user.findMany({
    where: {
      subscribedToUser: { some: { subscriberId: args.id } } 
    }
  });
  console.log(args.id, subscriptions);
  return subscriptions;
}

export async function getSubscribers(args: {id: string},  context: { prisma: PrismaClient }) {
  const subscribers = await context.prisma.user.findMany(
    { where: { userSubscribedTo: { some: { authorId: args.id } } } }
  );
  console.log(args.id, subscribers);
  return subscribers;
}
