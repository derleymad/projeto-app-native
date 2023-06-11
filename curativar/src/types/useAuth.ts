export type THandleLoginDTO = {
  user: string;
  password: string;
  setShowError: React.Dispatch<React.SetStateAction<boolean>>;
};

export type THandleCreateAccountDTO = {
  imageId: string;
  form: {
    type: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onError: () => void;
  handleDivergentPassword: () => void;
};
