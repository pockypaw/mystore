import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, styled } from "@mui/material";
import CreatePage from "../pages/CreatePage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ButtonPrimary = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <ButtonPrimary
        onClick={handleOpen}
        size="small"
        variant="contained"
        fullWidth
      >
        Edit Product
      </ButtonPrimary>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Input
            id="name"
            value={newProduct.name}
            onChange={handleInputChange}
            aria-describedby="name-helper-text"
            required
          />
          <Input
            id="name"
            value={newProduct.name}
            onChange={handleInputChange}
            aria-describedby="name-helper-text"
            required
          />
          <Input
            id="name"
            value={newProduct.name}
            onChange={handleInputChange}
            aria-describedby="name-helper-text"
            required
          />
        </Box>
      </Modal>
    </>
  );
}
