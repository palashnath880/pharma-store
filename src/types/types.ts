import { SvgIconComponent } from "@mui/icons-material";

export type NavMenuItem = {
  Icon: SvgIconComponent;
  href: string;
  label: string;
};

export type Generic = {
  name: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};
