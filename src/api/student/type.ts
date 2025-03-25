export type IStudent = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export type IGetAllStudent = {
  status: "success";
  doc: {
    id: string;
    status: string;
  }[] &
    IStudent;
};

export type IActionStudent = IStudent;
