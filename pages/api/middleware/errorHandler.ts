type CustomError = {
    status: number;
    message: string;
  };
  
  export const errorHandler = (res, err: CustomError) => {
    return res.status(err?.status || 500).json({ message: err.message });
  };
  