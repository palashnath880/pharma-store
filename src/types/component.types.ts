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
