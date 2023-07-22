import { PrismaClient } from "@prisma/client";

export async function getMemberTypes(args, context: { prisma: PrismaClient } ) {
  const memberTypes = await context.prisma.memberType.findMany();
  return memberTypes;
}

export async function getMemberType(args: {id: string},  context: { prisma: PrismaClient } ) {
  const memberType = await context.prisma.memberType.findUnique({
    where: {
      id: args.id,
    } });
  return memberType;
}
