import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { IStudent } from '../../../../apis';
import StudentFormCreate from './Form';

export default function StudentEdit({
  initValue,
  handleClose,
}: {
  initValue?: IStudent;
  handleClose: () => void;
}) {
  return (
    <Dialog open={Boolean(initValue)} onClose={handleClose} aria-describedby="edit student dialog">
      <DialogTitle>Edit Student</DialogTitle>

      <DialogContent>
        <StudentFormCreate onClose={handleClose} initValue={initValue} />
      </DialogContent>
    </Dialog>
  );
}
