"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import $axios from "@/lib/axios/axios.instance";
import Loader from "./Loader";

const DeleteProductDialog = (props) => {
  const [open, setOpen] = React.useState(false);

  //   for the refetch query
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["delete-product"],
    mutationFn: async () => {
      return await $axios.delete(`/product/delete/${props.productId}`);
    },
    onSuccess: () => {
      queryClient.refetchQueries("seller-product-list");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (isPending) {
    return <Loader />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        color="error"
        variant="contained"
        startIcon={<DeleteOutlineOutlinedIcon />}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this product?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deleting this product is a permanent action and cannot be undone.
            Please confirm if you wish to proceed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="success" variant="contained">
            No
          </Button>
          <Button
            onClick={() => {
              mutate();
              handleClose();
            }}
            autoFocus
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteProductDialog;
