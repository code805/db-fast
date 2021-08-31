import { fastify } from "../index.js";
import { getProducts, getProduct } from "../controllers/products.js";

const productProperties = {
  id: { type: "string" },
  name: { type: "string" },
  price: { type: "number" },
  created: { type: "string" },
  categories: { type: "array" },
  weight: { type: "number" },
  available: { type: "boolean" },
};

const getProductsOpts = (fastify) => ({
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: productProperties,
        },
      },
    },
  },
  handler: getProducts,
});

const getProductOpts = (fastify) => ({
  preValidation: [fastify.authenticate],
  shema: {
    response: {
      200: {
        type: "object",
        properties: productProperties,
      },
    },
  },
  handler: getProduct,
});

export const productsRoutes = function (fastify, opts, done) {
  // Routes for All Products
  fastify.get("/", getProductsOpts(fastify));
  // Routes for Single Products
  fastify.get("/:id", getProductOpts(fastify));

  done();
};
