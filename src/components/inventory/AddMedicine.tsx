"use client";

import type { MedicineFormInputs } from "@/types/reactHookForm.types";
import type { Generic } from "@/types/types";
import { Add, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import axios, { AxiosError } from "axios";
import PopupState, { bindDialog, bindTrigger } from "material-ui-popup-state";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import {
  Controller,
  SubmitHandler,
  UseControllerProps,
  useForm,
} from "react-hook-form";
import { useQuery } from "react-query";

const SelectGeneric = ({
  form: { control },
}: {
  form: UseControllerProps<MedicineFormInputs>;
}) => {
  //
  const [search, setSearch] = useState<string>("");

  // react-query
  const { data: generics, isLoading } = useQuery<{
    count: number;
    data: Generic[];
  }>({
    queryKey: ["generics", search],
    queryFn: async () => {
      const res = await axios.get(`/api/medicine-generic`, {
        params: {
          search: "",
          page: 1,
          limit: 50,
        },
      });
      return res.data;
    },
  });

  const options = Array.isArray(generics?.data) ? generics.data : [];

  const debounce = (func: any, delay: number = 500) => {
    let timeout: any;

    return function (...args: any) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return (
    <Controller
      control={control}
      name="generic"
      rules={{ required: true }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Autocomplete
          options={options}
          value={value || null}
          getOptionLabel={(option) => option?.name}
          isOptionEqualToValue={(option, val) => option?.id === val?.id}
          loading={isLoading}
          loadingText="Search Generics"
          onInputChange={debounce((_: any, e: any) => setSearch(e))}
          onChange={(_, e) => onChange(e || undefined)}
          noOptionsText="No Generic Available"
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Generic"
              error={Boolean(error)}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <InputAdornment position="end">
                        <CircularProgress color="inherit" size={20} />
                      </InputAdornment>
                    ) : (
                      params.InputProps.endAdornment
                    )}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};

export default function AddMedicine({ refetch }: { refetch: () => void }) {
  // states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // react-hook-form
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<MedicineFormInputs>();

  // submit handler
  const addMedicine: SubmitHandler<MedicineFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      await axios.post(`/api/medicine`, {
        name: data.name,
        genericId: data?.generic?.id,
      });
      enqueueSnackbar(<Typography>{data?.name} added.</Typography>, {
        variant: "success",
      });
      refetch();
      reset();
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
              <form onSubmit={handleSubmit(addMedicine)}>
                <div className="flex flex-col gap-5 mt-5">
                  <TextField
                    fullWidth
                    label="Medicine Name"
                    placeholder="Write Medicine Name"
                    error={Boolean(errors["name"])}
                    {...register("name", { required: true })}
                  />

                  <SelectGeneric
                    form={{
                      control: control,
                      name: "generic",
                    }}
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
                    disabled={isLoading}
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
