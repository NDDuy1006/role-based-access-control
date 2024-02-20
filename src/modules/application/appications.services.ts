import { InferModel, InferSelectModel } from "drizzle-orm";
import { db } from "../../db";
import { applications } from "../../db/schema";
import { CreateApplicationBody } from "./applications.schema";

export async function createApplication(data: CreateApplicationBody) {
  const result = await db.insert(applications).values(data).returning()

  return result[0]
}

export async function getApplications() {
  const result = await db
    .select({
      id: applications.id,
      name: applications.name,
      createdAt: applications.createdAt
    })
    .from(applications)
  
  return
}