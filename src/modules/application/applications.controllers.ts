import { FastifyReply, FastifyRequest } from "fastify";
import { CreateApplicationBody } from "./applications.schema";
import { createApplication, getApplications } from "./appications.services";
import { createRole } from "../roles/role.services";
import { ALL_PERMISSION, SYSTEM_ROLE, USER_ROLE_PERISSION } from "../../config/permission";

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

  const superAdminRolePromise = await createRole({
    applicationId: application.id,
    name: SYSTEM_ROLE.SUPER_ADMIN,
    permissions: ALL_PERMISSION as unknown as Array<string>
  })

  const applicationUserRolePromise = await createRole({
    applicationId: application.id,
    name: SYSTEM_ROLE.APPLICATION_USER,
    permissions: USER_ROLE_PERISSION
  })

  const [superAdminRole, applicationUserRole] = await Promise.allSettled([
    superAdminRolePromise,
    applicationUserRolePromise
  ])

  if (superAdminRole.status === "rejected") {
    throw new Error("Error creating super admin role")
  }

  if (applicationUserRole.status === "rejected") {
    throw new Error("Error creating application user role")
  }

  return {
    application,
    superAdminRole,
    applicationUserRole
  }
}

export async function getApplicationsHandler() {
  return getApplications()
}