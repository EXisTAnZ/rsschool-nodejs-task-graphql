import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { UUIDType } from "./uuid.js";
import { PostType } from "./post.js";
import { ProfileType } from "./porfile.js";
import { getUserProfile } from "../resolvers/profile-resolver.js";
import { getUserPosts } from "../resolvers/post-resolver.js";
import { getSubscribers, getSubscriptions } from "../resolvers/user-resolver.js";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: { 
      type: ProfileType,
      resolve: getUserProfile,
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: getUserPosts,
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: getSubscriptions,
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: getSubscribers,
    }
  }),
});