import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface IDeleteDialog {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  title: string;
  description: string;
}

export default function DeleteDialog({
  open,
  handleClose,
  handleSubmit,
  title,
  description,
}: IDeleteDialog) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby={title}
      aria-describedby={description}
    >
      <DialogTitle>{title}</DialogTitle>

      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}
