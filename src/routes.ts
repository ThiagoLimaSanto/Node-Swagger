import z from "zod";
import { FastifyTypedInstance } from "./types.js";
import { randomUUID } from "crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [];

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/users",
    {
      schema: {
        description: "Get all users",
        tags: ["Users"],
        response: {
          200: z.array(
            z.object({ id: z.string(), name: z.string(), email: z.string() }),
          ),
        },
      },
    },
    (request, reply) => {
      return users;
    },
  );

  app.post(
    "/users",
    {
      schema: {
        description: "Create a new user",
        tags: ["Users"],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.null().describe("User created successfully"),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      users.push({ id: randomUUID(), name, email });

      return reply.status(201).send(null);
    },
  );
}
