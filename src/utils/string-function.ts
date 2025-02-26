import { permissionsOptions } from "@/constants/static-options";

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeAllFirstLetter(string: string) {
  return string
    .split(" ")
    .map((string) => capitalizeFirstLetter(string))
    .join(" ");
}

type PermissionKeys = keyof typeof permissionsOptions;

export const findFirstRouteMatch = (permissions?: string[]) => {
  for (const key in permissionsOptions) {
    if (permissionsOptions.hasOwnProperty(key)) {
      const typedKey = key as PermissionKeys;
      const permissionObject = permissionsOptions[typedKey];
      if (
        Array.isArray(permissions) &&
        permissions.includes(permissionObject.view)
      ) {
        return { route: permissionObject.route };
      }
    }
  }
  return { route: "" };
};
