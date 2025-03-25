let API_ROUTES = {
  AUTH: {
    root: "users",
    login: "login",
  },
  STUDENT: {
    root: "users",
    GET_ALL_STUDENTS: "",
    ADD_STUDENT: "",
    UPDATE_STUDENT: (id: string) => id,
    DELETE_STUDENT: (id: string) => id,
  },
  SETTINGS: {
    root: "quizzes",
    GET_ALL_QUIZZES: "",
    ADD_QUIZZE: "",
    GET_QUIZZE: (id: string) => id,
    UPDATE_QUIZZE: (id: string) => id,
    DELETE_QUIZZE: (id: string) => id,
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
