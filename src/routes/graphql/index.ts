import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, graphql } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { UserType } from './types/user.js';
import { MemberTypesType } from './types/member-type.js';
import { getUser, getUsers } from './resolvers/user-resolver.js';
import { getMemberType, getMemberTypes } from './resolvers/member-type-resolver.js';
import { PostType } from './types/post.js';
import { getPost, getPosts } from './resolvers/post-resolver.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { prisma } = fastify;
      const resolvers = {
        user: getUser,
        users: getUsers,
        memberType: getMemberType,
        memberTypes: getMemberTypes,
        post: getPost,
        posts: getPosts,
      };
      const query = new GraphQLObjectType({
        name: "Query",
        fields: {
          user: {
            type: UserType,
            args: {
              id: { type: new GraphQLNonNull(UUIDType) },
            },
          },
          users: {
            type: new GraphQLList(UserType),
          },
          memberType: {
            type: MemberTypesType,
            args: {
              id: { type: new GraphQLNonNull(GraphQLString) },
            },
          },
          memberTypes: {
            type: new GraphQLList(MemberTypesType),
          },
          post: {
            type: PostType,
            args: {
              id: { type: new GraphQLNonNull(UUIDType) },
            },
          },
          posts: {
            type: new GraphQLList(PostType),
          },
        },
      });
      const schema = new GraphQLSchema({ query });
      const res = await graphql({
        schema,
        variableValues: req.body.variables,
        source: req.body.query,
        rootValue: resolvers,
        contextValue: { prisma },
      })
      return res;
    },
  });
};

export default plugin;
