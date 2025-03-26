export type IQuizze = {
  message: string;
  data: {
    results: {
      id: string;
      duration: number;
      numberOfAttempts: number;
      status: string;
      name: string;
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

export type IGetAllQuizzes = IQuizze;
export type IGetQuizze = {
  message: string;
  data: {
    id: string;
    duration: number;
    numberOfAttempts: number;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type IActionQuizze = {
  id?: string;
  duration: number;
  numberOfAttempts: number;
  status?: string;
  name: string;
};
