"use client";

import type { RegisterFormInputs } from "@/types/reactHookForm.types";
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
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Controller,
  SubmitHandler,
  useForm,
  Validate,
  ValidationRule,
} from "react-hook-form";

export default function Page() {
  // states
  const [isShown, setIsShown] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // react-hook-form
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<RegisterFormInputs>();

  // password validation with regex
  const passwordValidation = (value: string): string | boolean => {
    const arr = [
      { value: /(?=.*[a-z])/, message: "Al least one lowercase character" },
      { value: /(?=.*[A-Z])/, message: "Al least one uppercase character" },
      { value: /(?=.*\d)/, message: "Al least one digit" },
    ];

    const err = arr.find((i) => !i.value.test(value));
    return err ? err?.message : true;
  };

  // register handler
  const registerHandler: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      setErrorMsg("");
      await axios.post(`/api/auth/register`, data, {
        headers: { "Content-Type": "application/json" },
      });
      setIsAgree(false);
      signIn("credentials", {
        redirect: false,
        email: data?.email,
        password: data?.password,
      });
      window.location.reload();
      reset();
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
        <div className="flex flex-col justify-center w-1/2 px-5 py-10">
          <div className="flex flex-col gap-5 md:w-[400px] mx-auto">
            <Typography variant="h5" className="!font-semibold">
              Get Started Now
            </Typography>
            <form onSubmit={handleSubmit(registerHandler)}>
              <div className="flex flex-col gap-5">
                <TextField
                  label="Name"
                  fullWidth
                  placeholder="Enter name here"
                  error={Boolean(errors["name"])}
                  {...register("name", { required: true })}
                />
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
                  rules={{ required: true, validate: passwordValidation }}
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

                <div className="px-2">
                  <FormControlLabel
                    checked={isAgree}
                    control={
                      <Checkbox
                        size="small"
                        onChange={(e) => setIsAgree(!!e.target.checked)}
                      />
                    }
                    label={
                      <Typography>
                        I agree to the{" "}
                        <Link
                          href={"/terms-&-policy"}
                          target="_blank"
                          className="underline text-primary"
                        >
                          terms & policy
                        </Link>
                      </Typography>
                    }
                  />
                </div>

                {/* error message */}
                {errorMsg && (
                  <Typography className="!text-red-500 !text-center">
                    {errorMsg}
                  </Typography>
                )}

                <Button
                  variant="contained"
                  type="submit"
                  disabled={!isAgree || isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
            <Typography className="!text-center">
              Have an account{" "}
              <Link href={"/login"} className="underline !text-primary">
                Sign In
              </Link>
            </Typography>
          </div>
        </div>
        <div className="w-1/2">
          <Image
            src={"/images/login.jpeg"}
            width={500}
            height={600}
            draggable={false}
            className="w-full h-full object-cover"
            alt="Login Thumbnail"
          />
        </div>
      </div>
    </div>
  );
}
