import { lazy } from "react";

export const AUTH_PAGES = {
  AUTH: lazy(() => import("../pages/auth/login")),
};

export const USER_PAGES = {
  USER: lazy(() => import("../pages/users/user")),
};

export const PRODUCT_PAGES = {
  PRODUCT: lazy(() => import("../pages/products/products")),
  PRODUCT_ACTION: lazy(() => import("../pages/products/product-action")),
  PRODUCT_DETAILS: lazy(() => import("../pages/products/product-details")),
};

export const NOT_FOUND_PAGE = {
  NOT_FOUND: lazy(() => import("../components/global/not-found")),
};
