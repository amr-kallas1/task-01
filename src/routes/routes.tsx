import Auth from "@/components/routes/Auth";
import NotAuth from "@/components/routes/NotAuth";
import Permissions from "@/components/routes/Permissions";
import { permissionsOptions } from "@/constants/static-options";
import Layout from "@/layout/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { NOT_FOUND_PAGE, PRODUCT_PAGES, USER_PAGES } from "./elements";
import { AUTH_PATH, NOT_FOUND_PATH, PRODUCT_PATH, USERS_PATH } from "./path";
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
            {/* User Page */}
            <Route path={USERS_PATH.USERS}>
              <Route
                index
                element={
                  <Permissions
                    role={permissionsOptions.user.view}
                    Component={<USER_PAGES.USER />}
                  />
                }
              />
            </Route>

            {/* Product Page */}
            <Route path={PRODUCT_PATH.PRODUCTS}>
              <Route
                index
                element={
                  <Permissions
                    role={permissionsOptions.product.view}
                    Component={<PRODUCT_PAGES.PRODUCT />}
                  />
                }
              />
              <Route
                path={PRODUCT_PATH.ADD_PRODUCT}
                element={
                  <Permissions
                    role={permissionsOptions.product.set}
                    Component={<PRODUCT_PAGES.PRODUCT_ACTION />}
                  />
                }
              />
              <Route
                path={PRODUCT_PATH.EDIT_PRODUCT + "/:id"}
                element={
                  <Permissions
                    role={permissionsOptions.product.set}
                    Component={<PRODUCT_PAGES.PRODUCT_ACTION />}
                  />
                }
              />
              <Route
                path={PRODUCT_PATH.PRODUCT_DETAILS + "/:id"}
                element={
                  <Permissions
                    role={permissionsOptions.product.view}
                    Component={<PRODUCT_PAGES.PRODUCT_DETAILS />}
                  />
                }
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
