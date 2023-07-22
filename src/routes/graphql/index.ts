import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, graphql } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { UserType } from './types/user.js';
// START
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
        },
      });
      const schema = new GraphQLSchema({ query });
      const res = await graphql({
        schema,
        variableValues: req.body.variables,
        source: req.body.query
      })
      return res;
    },
  });
};

export default plugin;
