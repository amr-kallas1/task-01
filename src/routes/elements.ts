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

export const SETTINGS_PAGES = {
  SETTING: lazy(() => import("../pages/settings/settings")),
  SETTING_ACTION: lazy(() => import("../pages/settings/setting-action")),
};

export const EXAMS_PAGES = {
  EXAM: lazy(() => import("../pages/exams/exams")),
  EXAM_ACTION: lazy(() => import("../pages/exams/exam-action")),
};

export const NOT_FOUND_PAGE = {
  NOT_FOUND: lazy(() => import("../components/global/not-found")),
};
