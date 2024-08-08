import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function EmptyMessage({ title }: { title: string }) {
  return (
    <div className="py-10 flex justify-center">
      <div className="flex flex-col items-center">
        <Image
          src={"/images/error.svg"}
          alt="Error"
          className=""
          width={200}
          height={200}
        />
        <Typography variant="body1" className="!text-center !text-primary">
          {title}
        </Typography>
      </div>
    </div>
  );
}
