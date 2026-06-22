import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
    jsonSchemaTransform,
    serializerCompiler,
    validatorCompiler,
    ZodTypeProvider,
} from "fastify-type-provider-zod";
import { routes } from "./routes.js";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Node Swagger",
      description: "Node Swagger",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.register(routes);

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.get("/", (request, reply) => {
  return reply.send("Hello World!");
});

app.listen({ port: 3333 }, () => {
  console.log("Server listening on port 3000");
});
