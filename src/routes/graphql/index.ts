import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString, graphql, parse, validate } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { UserType } from './types/user.js';
import { MemberTypesType } from './types/member-type.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/porfile.js';
import { resolvers } from './resolvers/index.js';

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
          profile: {
            type: ProfileType,
            args: {
              id: { type: new GraphQLNonNull(UUIDType) },
            },
          },
          profiles: {
            type: new GraphQLList(ProfileType),
          },
        },
      });
      const schema = new GraphQLSchema({ query });
      const errors = validate(schema, parse(req.body.query));

      if (errors.length > 0) {
        return { errors };
      };
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
