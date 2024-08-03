import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <div className="flex flex-col justify-center w-1/2">
          <Image
            src={"/images/login.jpeg"}
            width={500}
            height={600}
            draggable={false}
            className="w-full h-full object-cover"
            alt="Login Thumbnail"
          />
        </div>
        <div className="flex flex-col justify-center w-1/2 px-5 py-10">
          <div className="flex flex-col gap-5 md:w-[400px] mx-auto">
            <Typography variant="h5" className="!font-semibold">
              Welcome back!
            </Typography>
            <form>
              <div className="flex flex-col gap-5">
                <TextField label="Email" />
                <TextField label="Password" />
                <div className="px-2 flex justify-between items-center">
                  <FormControlLabel
                    control={<Checkbox size="small" />}
                    label={"Remember me"}
                  />
                  <Typography className="hover:!underline cursor-pointer">
                    Forgot Password?
                  </Typography>
                </div>
                <Button variant="contained">Login</Button>
              </div>
            </form>
            <Typography className="!text-center">
              {"Don't"} have an account{" "}
              <Link href={"/register"} className="underline !text-primary">
                Register
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
