export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  status: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    status: string;
  };
  token: string;
};
