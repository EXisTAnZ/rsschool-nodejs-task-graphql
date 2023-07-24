import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { MemberTypesType } from "./member-type.js";
import { getMemberTypeNest } from "../resolvers/member-type-resolver.js";

export const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberTypesType),
      resolve: getMemberTypeNest,
    },
  },
});
