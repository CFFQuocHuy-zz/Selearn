import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { GroupAPI, IGroup, IGroupDetail } from '../../../../apis';
import GroupFormCreate from './Form';
import GroupFormSkeleton from './GroupFormSkeleton';

export default function GroupEdit({
  initValue,
  handleClose,
}: {
  initValue?: IGroup;
  handleClose: () => void;
}) {
  const [dataInitValue, setDataInitValue] = useState<IGroupDetail | undefined>(undefined);
  const [isGettingData, setIsGettingData] = useState(true);

  useEffect(() => {
    const fetchDataInitValue = async (id: number) => {
      try {
        setIsGettingData(true);
        const response = await GroupAPI.getDetailGroup(id);
        setDataInitValue(response.data);
      } catch {
        console.error('Error');
      } finally {
        setIsGettingData(false);
      }
    };

    if (initValue?.id) fetchDataInitValue(initValue.id);
  }, [initValue]);

  return (
    <Dialog
      open={Boolean(initValue)}
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Edit Group</DialogTitle>

      <DialogContent>
        {isGettingData ? (
          <GroupFormSkeleton onClose={handleClose} />
        ) : (
          <GroupFormCreate onClose={handleClose} initValue={dataInitValue} />
        )}
      </DialogContent>
    </Dialog>
  );
}
