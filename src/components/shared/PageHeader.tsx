import { PageHeaderProps } from "@/types/component.types";
import { Typography } from "@mui/material";
import React from "react";

export default function PageHeader({
  title,
  rightAction,
  subtitle,
}: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <Typography variant="h6" className="!font-semibold !text-primary">
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="subtitle2" className="!opacity-80">
            {subtitle}
          </Typography>
        )}
      </div>
      <>{rightAction}</>
    </div>
  );
}
