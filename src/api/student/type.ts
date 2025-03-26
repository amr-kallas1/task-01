export type IStudent = {
  name: string;
  email: string;
  password: string;
  role: string;
  id: string;
  status: string;
};

export type IGetAllStudent = {
  data: IStudent[];
};

export type IGetStudent = {
  data: IStudent;
};

export type IActionStudent = { id?: string } & Omit<
  IStudent,
  "id" | "role" | "status"
>;
