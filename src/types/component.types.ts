import type { Group } from "./types";

export type SearchFormProps = {
  placeholder: string;
  value?: string | undefined;
  onSearch?: (val: string) => void;
};

export type PageHeaderProps = {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  rightAction?: React.ReactNode;
};

export type DeleteMedicineGroupProps = {
  group: Group;
  refetch: () => void;
};

export type DeleteConfirmProps = {
  open: boolean;
  close: () => void;
  title: string;
  confirm?: () => void;
};
