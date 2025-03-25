export type IQuizze = {
  message: string;
  data: {
    id: string;
    duration: number;
    numberOfAttempts: number;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }[];
};

export type IGetAllQuizzes = IQuizze;
export type IGetQuizze = IQuizze;

export type IActionQuizze = {
  id: string;
  duration: number;
  numberOfAttempts: number;
  status?: string;
  name: string;
};
