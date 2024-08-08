import { SvgIconComponent } from "@mui/icons-material";

export type NavMenuItem = {
  Icon: SvgIconComponent;
  href: string;
  label: string;
};

export type Group = {
  name: string;
  createdAt: string;
  id: string;
};
