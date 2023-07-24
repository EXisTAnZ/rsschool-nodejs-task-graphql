import { PrismaClient } from "@prisma/client";


export async function getProfiles(args, context: { prisma: PrismaClient } ) {
  const profiles = await context.prisma.profile.findMany();
  return profiles;
}

export async function getProfile(args: {id: string},  context: { prisma: PrismaClient } ) {
  const profile = await context.prisma.profile.findUnique({
    where: {
      id: args.id,
    },
  });
  return profile;
}

export async function getUserProfile(args: {id: string},  context: { prisma: PrismaClient } ) {
  const profile = await context.prisma.profile.findUnique({
    where: {
      userId: args.id,
    },
  });
  return profile;
}