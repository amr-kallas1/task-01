import { PRODUCT_PATH, USERS_PATH } from "@/routes/path";

export const permissionsOptions = {
  user: {
    view: "ViewUser",
    set: "SetUser",
    delete: "DeleteUser",
    route: USERS_PATH.USERS,
  },
  product: {
    view: "ViewProduct",
    set: "SetProduct",
    delete: "DeleteProduct",
    route: PRODUCT_PATH.PRODUCTS,
  },
};
