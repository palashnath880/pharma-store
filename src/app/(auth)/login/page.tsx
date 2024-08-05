"use client";
import { LoginFormInputs } from "@/types/reactHookForm.types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  // states
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // react-hook-form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({ defaultValues: { rememberMe: false } });

  // login handler
  const loginHandler: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      await signIn("credentials", { redirect: true, ...data });
      // reset();
      // window.location.reload();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setErrorMsg(
        error?.response?.data?.message || "Sorry! Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

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
            <form onSubmit={handleSubmit(loginHandler)}>
              <div className="flex flex-col gap-5">
                <TextField
                  fullWidth
                  label="Email"
                  placeholder="Enter email here"
                  error={Boolean(errors["email"])}
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                  })}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{ required: true }}
                  render={({
                    fieldState: { error },
                    field: { value, onChange },
                  }) => (
                    <TextField
                      fullWidth
                      type={isShown ? "text" : "password"}
                      label="Password"
                      placeholder="Enter password here"
                      error={Boolean(error)}
                      helperText={
                        error?.message && (
                          <p className="mt-1 text-red-500 text-xs">
                            {error?.message}
                          </p>
                        )
                      }
                      onChange={(e) => onChange(e.target.value)}
                      InputProps={{
                        endAdornment: value?.length > 0 && (
                          <InputAdornment
                            position="end"
                            className="!cursor-pointer"
                          >
                            <IconButton onClick={() => setIsShown(!isShown)}>
                              {isShown ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />

                <div className="px-2 flex justify-between items-center">
                  <Controller
                    control={control}
                    name="rememberMe"
                    render={({ field: { value, onChange } }) => (
                      <FormControlLabel
                        checked={Boolean(value)}
                        control={
                          <Checkbox
                            onChange={(e) => onChange(!!e.target.checked)}
                            size="small"
                          />
                        }
                        label={"Remember me"}
                      />
                    )}
                  />

                  <Typography className="hover:!underline cursor-pointer">
                    Forgot Password?
                  </Typography>
                </div>

                {/* error message */}
                {errorMsg && (
                  <Typography className="!text-red-500 !text-center">
                    {errorMsg}
                  </Typography>
                )}

                <Button variant="contained" disabled={isLoading} type="submit">
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
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
