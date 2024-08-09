"use client";

import { Add, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import {
  bindDialog,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { enqueueSnackbar } from "notistack";
import React, { FormEvent, FormEventHandler, useState } from "react";

export default function AddMedicineGroup({
  refetch,
}: {
  refetch?: () => void;
}) {
  // states
  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // add popup state
  const popupState = usePopupState({
    variant: "popover",
    popupId: "addMedicineGroup",
  });

  // add handler
  const addHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setErrorMsg("");
      await axios.post(`/api/medicine-groups`, { name: value });
      enqueueSnackbar(`${value} added successfully`, { variant: "success" });
      setValue("");
      popupState.close();
      typeof refetch === "function" && refetch();
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
    <>
      <Tooltip title="Add New Group">
        <Button
          variant="contained"
          className="!capitalize"
          startIcon={<Add />}
          {...bindTrigger(popupState)}
        >
          Add New Group
        </Button>
      </Tooltip>

      <Dialog {...bindDialog(popupState)}>
        <div className="max-sm:w-[95%] w-[400px] px-5 py-5">
          <div className="flex justify-between items-center">
            <Typography
              variant="body1"
              className="!font-semibold !text-primary"
            >
              Add New Medicine Group
            </Typography>
            <IconButton size="medium" onClick={popupState.close}>
              <Close />
            </IconButton>
          </div>
          <form onSubmit={addHandler}>
            <div className="flex flex-col gap-5 mt-4">
              <TextField
                fullWidth
                label="Group Name"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              {/* error message */}
              {errorMsg && (
                <Typography
                  variant="subtitle2"
                  className="text-red-500 text-center"
                >
                  {errorMsg}
                </Typography>
              )}
              <Button
                fullWidth
                type="submit"
                variant="contained"
                className="!capitalize"
                startIcon={<Add />}
                disabled={value?.length <= 0 || isLoading}
              >
                Add New Group
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
