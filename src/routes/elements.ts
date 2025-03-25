import { lazy } from "react";

export const HOME_PAGES = {
  HOME: lazy(() => import("../pages/home/home")),
};

export const AUTH_PAGES = {
  AUTH: lazy(() => import("../pages/auth/login")),
};

export const USER_PAGES = {
  USER: lazy(() => import("../pages/users/user")),
};

export const STUDENT_PAGES = {
  STUDENT: lazy(() => import("../pages/students/students")),
  STUDENT_ACTION: lazy(() => import("../pages/students/student-action")),
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
