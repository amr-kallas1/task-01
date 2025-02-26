let API_ROUTES = {
  PRODUCT: {
    root: "posts",
    GET_ALL_PRODUCTS: "",
    GET_PRODUCT: "",
    ADD_PRODUCT: "",
    UPDATE_PRODUCT: "",
    DELETE_PRODUCT: "",
  },
  USER: {
    root: "users",
    GET_ALL_USER: "",
  },
};
const controllersArr = Object.entries(API_ROUTES).map(
  ([controllerKey, { root, ...routes }]) => {
    const routesArr = Object.entries(routes);
    const routesPrefixed = Object.fromEntries(
      routesArr.map(([routeKey, route]) => {
        if (typeof route === "function") {
          return [
            routeKey,
            (...params: any[]) => `${root}/${(route as Function)(params[0])}`,
          ];
        }
        return [routeKey, `${root}/${route}`];
      })
    );
    return [controllerKey, { ...routesPrefixed, root }];
  }
);
API_ROUTES = Object.fromEntries(controllersArr) as typeof API_ROUTES;

export default API_ROUTES;
