import { Avatar, Typography } from "@mui/material";
import React from "react";

export default function TopBar() {
  return (
    <div className="!py-3 shadow-lg px-5 flex justify-between ">
      <div></div>
      {/* profile menu */}
      <div className="flex items-center gap-2">
        <div className="flex flex-col text-end">
          <Typography
            variant="subtitle1"
            className="!font-semibold !text-primary"
          >
            Palash Nath
          </Typography>
          <Typography variant="body2" className="!text-primary">
            palashnath@gmail.com
          </Typography>
        </div>
        <Avatar className="!cursor-pointer">Pk</Avatar>
      </div>
    </div>
  );
}
