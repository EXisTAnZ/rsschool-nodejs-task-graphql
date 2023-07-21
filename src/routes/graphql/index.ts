import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { buildSchema, graphql } from 'graphql';
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
      const schema = buildSchema('lalala')
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
