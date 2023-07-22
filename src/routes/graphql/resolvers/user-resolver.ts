import { PrismaClient } from "@prisma/client";


export async function getUsers(prismaClient: PrismaClient) {
  const users = await prismaClient.user.findMany();
  return users;
}