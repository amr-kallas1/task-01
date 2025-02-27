export type IProduct = {
  id: number;
  slug: string;
  url: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  userId: number;
};


export type IGetAllProduct = IProduct[];

export type IAddProduct = {
  slug: string;
  content: string;
  title: string;
  category: string;
  image: string;
};

export type IUpdateProduct = IAddProduct & { id: number };

export type IGetProductById = IProduct;

