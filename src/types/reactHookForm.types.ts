import type { Generic } from "./types";

export type RegisterFormInputs = {
  email: string;
  password: string;
  name: string;
};

export type LoginFormInputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type MedicineFormInputs = {
  name: string;
  generic: Generic | undefined;
};
