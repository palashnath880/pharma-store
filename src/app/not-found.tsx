import { Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <Typography variant="h5" className="!font-semibold">
          Sorry, this page {"isn't"} available
        </Typography>
        <Typography>
          This link you followed may be broken, or the page may have been
          removed.{" "}
          <Link href={"/"} className="!text-primary font-medium">
            Go Back To Home
          </Link>
        </Typography>
      </div>
    </div>
  );
}
