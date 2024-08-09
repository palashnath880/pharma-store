import type { DeleteConfirmProps } from "@/types/component.types";
import { Close, Done } from "@mui/icons-material";
import { Button, Dialog, Typography } from "@mui/material";
import React from "react";

export default function DeleteConfirm({
  close,
  open,
  title,
  confirm,
}: DeleteConfirmProps) {
  return (
    <Dialog open={open} onClose={close}>
      <div className="max-sm:w-[95%] w-[400px] px-5 py-5">
        <div className="flex justify-between items-center">
          <Typography className="!font-semibold !text-primary">
            {title}
          </Typography>
        </div>
        <div className="flex mt-5 gap-3">
          <Button
            variant="outlined"
            color="error"
            className="!flex-1 !capitalize"
            startIcon={<Close />}
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="!flex-1 !capitalize"
            startIcon={<Done />}
            onClick={confirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
