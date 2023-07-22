import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UUIDType } from "./uuid.js";
import { UserType } from "./user.js";
import { MemberTypesType } from "./member-type.js";

export const ProfileType = new GraphQLObjectType({
  name: "Profile",
  fields: {
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    user: { type: new GraphQLNonNull(UserType) },
    memberType: { type: new GraphQLNonNull(MemberTypesType) },
  },
})