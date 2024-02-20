export const ALL_PERMISSION = [
  //users
  "users:roles:write", // Allowed to add a role to a user
  "users:roles:delete", // Allowed to remove a role from a user

  //posts
  "posts: write",
  "posts: read",
] as const

export const PERMISSIONS = ALL_PERMISSION.reduce((acc, permission) => {
  acc[permission] = permission

  return acc
}, {} as Record<(typeof ALL_PERMISSION)[number], (typeof ALL_PERMISSION)[number]>)

export const USER_ROLE_PERISSION = [
  PERMISSIONS["posts: write"],
  PERMISSIONS["posts: read"]
]

export const SYSTEM_ROLE = {
  SUPER_ADMIN: "SUPER_ADMIN",
  APPLICATION_USER: "APPLICATION_USER"
}