import { DeleteGenericProps } from "@/types/component.types";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import DeleteConfirm from "../shared/DeleteConfirm";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import axios, { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";

export default function DeleteGeneric({ group, refetch }: DeleteGenericProps) {
  // popup state
  const popupState = usePopupState({
    variant: "popover",
    popupId: "deleteGeneric",
  });

  // handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/medicine-generic/${group.id}`);
      popupState.close();
      enqueueSnackbar(`${group.name} deleted successfully`, {
        variant: "success",
      });
      refetch();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const msg =
        error?.response?.data?.message || "Sorry! Something went wrong";
      enqueueSnackbar(msg, { variant: "error" });
    }
  };

  return (
    <>
      <Tooltip title={`Delete ${group.name}`}>
        <IconButton color="error" {...bindTrigger(popupState)}>
          <Delete />
        </IconButton>
      </Tooltip>

      {/* delete confirm dialog */}
      <DeleteConfirm
        open={popupState.isOpen}
        close={popupState.close}
        title={`Final confirmation: Delete medicine generic?`}
        confirm={handleDelete}
      />
    </>
  );
}
