import { FastifyReply, FastifyRequest } from "fastify";
import { CreateApplicationBody } from "./applications.schema";
import { createApplication } from "./appications.services";

export async function createApplicationHandler(
  req: FastifyRequest<{
    Body: CreateApplicationBody
  }>,
  rep: FastifyReply
) {
  const { name } = req.body
  
  const application = await createApplication({
    name
  })

  return {
    application
  }
}