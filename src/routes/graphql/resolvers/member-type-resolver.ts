import { PrismaClient } from "@prisma/client";
import { MemberTypeId } from "../../member-types/schemas.js";

export async function getMemberTypes(args, context: { prisma: PrismaClient } ) {
  const memberTypes = await context.prisma.memberType.findMany();
  return memberTypes;
}

export async function getMemberType(args: {memberTypeId: MemberTypeId},  context: { prisma: PrismaClient } ) {
  const memberType = await context.prisma.memberType.findUnique({
    where: {
      id: args.memberTypeId,
    } });
  return memberType;
}

export async function getMemberTypeNest(args: {memberTypeId: MemberTypeId}, _,  context: { prisma: PrismaClient } ) {
  const memberType = await context.prisma.memberType.findUnique({
    where: {
      id: args.memberTypeId,
    } });
  return memberType;
}
