import CreateIcon from '@mui/icons-material/Create';
import { Button, ButtonGroup, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import StudentFormCreate from './Form';

export default function StudentCreate() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
        disableRipple
        disableElevation
        color="secondary"
        sx={{
          '& .MuiButtonGroup-grouped': {
            '&:not(:last-of-type)': {
              borderRight: 'none',
              backgroundColor: 'secondary.dark',
              width: 24,
            },
            '&:not(:first-of-type)': {
              pl: 2,
              pr: 4,
            },
          },
        }}
        onClick={handleClickOpen}
      >
        <Button>
          <CreateIcon />
        </Button>
        <Button>New</Button>
      </ButtonGroup>

      <Dialog open={open} onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <DialogTitle>Create new Student</DialogTitle>
        <DialogContent>
          <StudentFormCreate onClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
