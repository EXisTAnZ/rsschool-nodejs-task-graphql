import { getMemberType, getMemberTypes } from "./member-type-resolver.js";
import { getPost, getPosts } from "./post-resolver.js";
import { getProfile, getProfiles } from "./profile-resolver.js";
import { getUser, getUsers } from "./user-resolver.js";

export const resolvers = {
    user: getUser,
    users: getUsers,
    memberType: getMemberType,
    memberTypes: getMemberTypes,
    post: getPost,
    posts: getPosts,
    profile: getProfile,
    profiles: getProfiles,
  };