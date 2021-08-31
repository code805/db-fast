import dotenv from "dotenv";
import Fastify from "fastify";
import FastifyJwt from "fastify-jwt";
import FastifyBcrypt from "fastify-bcrypt";
// Local Files
import { authRoutes } from "./routes/auth.js";
import { productsRoutes } from "./routes/products.js";
import { users } from "./dummy-data/users.js";

dotenv.config();
const PORT = process.env.PORT;
const SECRET_KEY = process.env.SECRET_KEY;

export const fastify = await Fastify({ logger: true });

fastify.register(FastifyJwt, { secret: SECRET_KEY });
fastify.register(FastifyBcrypt, { saltWorkFactor: 12 });

// fastify.addHook("onRequest", async (request, reply) => {
//   try {
//     await request.jwtVerify();
//   } catch (err) {
//     reply.send(err);
//   }
// });
fastify.decorate("authenticate", async function (request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

fastify.get("/", (_, res) => {
  res.send({ users });
});
fastify.register(authRoutes, { prefix: "/auth" });
fastify.register(productsRoutes, { prefix: "/products" });

const start = async () => {
  try {
    fastify.listen(PORT, () => {
      console.log("Listening on PORT: " + PORT);
    });
  } catch (error) {
    fastify.log.error(error);
  }
};

start();
