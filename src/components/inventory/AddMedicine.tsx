"use client";

import { Add, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import PopupState, { bindDialog, bindTrigger } from "material-ui-popup-state";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

export default function AddMedicine({ refetch }: { refetch: () => void }) {
  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [value, setValue] = useState<string>("");

  // submit handler
  const addMedicine = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError("");
      await axios.post(`/api/medicine`, { name: value });
      enqueueSnackbar(<Typography>{value} medicine name added.</Typography>, {
        variant: "success",
      });
      refetch();
      setValue("");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error?.response?.data?.message || "Sorry! Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <>
          <Button
            startIcon={<Add />}
            variant="contained"
            className="!capitalize"
            {...bindTrigger(popupState)}
          >
            Add Medicine
          </Button>

          <Dialog {...bindDialog(popupState)}>
            <div className="px-5 py-5 w-[95%] sm:w-[400px]">
              <div className="flex justify-between items-center">
                <Typography className="!text-primary !font-semibold">
                  Add New Medicine
                </Typography>
                <IconButton color="error" onClick={popupState.close}>
                  <Close />
                </IconButton>
              </div>
              <form onSubmit={addMedicine}>
                <div className="flex flex-col gap-5 mt-5">
                  <TextField
                    fullWidth
                    label="Medicine Name"
                    placeholder="Write Medicine Name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  {error && (
                    <Typography
                      variant="subtitle2"
                      className="text-red-500 text-center"
                    >
                      {error}
                    </Typography>
                  )}
                  <Button
                    fullWidth
                    type="submit"
                    startIcon={!isLoading && <Add />}
                    className="!capitalize"
                    variant="contained"
                    disabled={isLoading || value?.length <= 0}
                  >
                    {isLoading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      "Add Medicine Name"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </Dialog>
        </>
      )}
    </PopupState>
  );
}
