import Auth from "@/components/routes/Auth";
import NotAuth from "@/components/routes/NotAuth";
import Layout from "@/layout/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import {
  EXAMS_PAGES,
  HOME_PAGES,
  NOT_FOUND_PAGE,
  PRODUCT_PAGES,
  SETTINGS_PAGES,
  USER_PAGES,
} from "./elements";
import {
  AUTH_PATH,
  EXAMS_PATH,
  NOT_FOUND_PATH,
  PRODUCT_PATH,
  SETTINGS_PATH,
  USERS_PATH,
} from "./path";
import Login from "@/pages/auth/login";

export default createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route element={<NotAuth />}>
          <Route path={AUTH_PATH.LOGIN} element={<Login />} />
        </Route>
        <Route element={<Layout />}>
          <Route element={<Auth />}>
            {/* Home Page */}
            <Route path={"/"}>
              <Route index element={<HOME_PAGES.HOME />} />
            </Route>

            {/* User Page */}
            <Route path={USERS_PATH.USERS}>
              <Route index element={<USER_PAGES.USER />} />
            </Route>

            {/* Product Page */}
            <Route path={PRODUCT_PATH.PRODUCTS}>
              <Route index element={<PRODUCT_PAGES.PRODUCT />} />
              <Route
                path={PRODUCT_PATH.ADD_PRODUCT}
                element={<PRODUCT_PAGES.PRODUCT_ACTION />}
              />
              <Route
                path={PRODUCT_PATH.EDIT_PRODUCT + "/:id"}
                element={<PRODUCT_PAGES.PRODUCT_ACTION />}
              />
              <Route
                path={PRODUCT_PATH.PRODUCT_DETAILS + "/:id"}
                element={<PRODUCT_PAGES.PRODUCT_DETAILS />}
              />
            </Route>

            {/* Exams Page */}
            <Route path={EXAMS_PATH.EXAMS}>
              <Route index element={<EXAMS_PAGES.EXAM />} />
              <Route
                path={EXAMS_PATH.ADD_EXAM}
                element={<EXAMS_PAGES.EXAM_ACTION />}
              />
              <Route
                path={EXAMS_PATH.EDIT_EXAM + "/:id"}
                element={<EXAMS_PAGES.EXAM_ACTION />}
              />
            </Route>

            {/* Settings Page */}
            <Route path={SETTINGS_PATH.SETTINGS}>
              <Route index element={<SETTINGS_PAGES.SETTING />} />
              <Route
                path={SETTINGS_PATH.ADD_SETTING}
                element={<SETTINGS_PAGES.SETTING_ACTION />}
              />
              <Route
                path={SETTINGS_PATH.EDIT_SETTING + "/:id"}
                element={<SETTINGS_PAGES.SETTING_ACTION />}
              />
            </Route>

            <Route
              path={NOT_FOUND_PATH.NOT_FOUND}
              element={<NOT_FOUND_PAGE.NOT_FOUND />}
            />

            <Route path="*" element={<NOT_FOUND_PAGE.NOT_FOUND />} />
          </Route>
        </Route>
      </Route>
    </>
  )
);
