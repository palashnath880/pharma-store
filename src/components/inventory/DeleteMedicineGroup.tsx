import { DeleteMedicineGroupProps } from "@/types/component.types";
import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import DeleteConfirm from "../shared/DeleteConfirm";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import axios, { AxiosError } from "axios";

export default function DeleteMedicineGroup({
  group,
  refetch,
}: DeleteMedicineGroupProps) {
  // popup state
  const popupState = usePopupState({
    variant: "popover",
    popupId: "deleteMedicineGroup",
  });

  // handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/medicine-groups/${group.id}`);
      popupState.close();
      refetch();
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      console.log(error);
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
        title={`Final confirmation: Delete medicine group?`}
        confirm={handleDelete}
      />
    </>
  );
}
