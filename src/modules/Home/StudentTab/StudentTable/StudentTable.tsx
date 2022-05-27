import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Avatar,
  Box,
  Button,
  Pagination,
  Stack,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import pluralize from 'pluralize';
import { useState } from 'react';
import { StudentCreate, StudentEdit } from '../';
import { IGroup, IStudent, StudentAPI } from '../../../../apis';
import { DeleteDialog } from '../../../../components';
import { useHome } from '../../../../hooks';

const VISIBLE_GROUP = 2;

const Groups = ({ value }: { value: IGroup[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isMore = value.length > VISIBLE_GROUP;
  const visible = isOpen ? value.length : VISIBLE_GROUP;
  const currentValue = value.slice(0, visible);

  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      flexWrap="wrap"
      justifyContent="flex-end"
    >
      {currentValue.map((group: IGroup, index: number) => (
        <Typography fontSize={'0.875rem'} key={group.id} sx={{ ml: '4px !important' }}>
          {group.name}

          {index !== currentValue.length - 1 && ','}
        </Typography>
      ))}
      <Typography fontSize={'0.875rem'} sx={{ ml: '4px !important' }}>
        {isMore && (isOpen ? '' : 'and')}
      </Typography>
      {isMore && (
        <Button
          variant="text"
          sx={{
            py: 0,
            px: 0.75,
            fontSize: '0.875rem',
            ml: '0 !important',
            minWidth: 'fit-content',
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((preState) => !preState);
          }}
        >
          {isOpen ? 'Hide' : `${value.length - VISIBLE_GROUP} more`}
        </Button>
      )}
    </Stack>
  );
};

export default function StudentTable() {
  const { selected, handleAddRow, studentData, handleReFetchStudent } = useHome();
  const { enqueueSnackbar } = useSnackbar();

  // EDIT LOGIC
  const [initValue, setInitValue] = useState<IStudent | undefined>(undefined);
  const handleCloseEdit = () => {
    setInitValue(undefined);
  };

  // DELETE LOGIC
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idDeleteStudent, setIdDeleteStudent] = useState(0);
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleSubmitDeleteStudent = async () => {
    try {
      const response = await StudentAPI.deleteStudent(idDeleteStudent);
      if (response?.data) {
        enqueueSnackbar(`Delete student success!`, {
          variant: 'success',
        });
        handleReFetchStudent();
        handleCloseDeleteDialog();
      }
    } catch {
      console.error('Error');
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 120,
      sortable: false,
      filterable: false,
      renderCell: ({ value, row }) => (
        <>
          <Avatar className="Mui-table-view-detail" alt={row.name} src={value} />

          <Tooltip title="View detail" placement="top">
            <IconButton
              className="Mui-table-action"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setInitValue(row);
              }}
            >
              <VisibilityOutlinedIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    { field: 'name', headerName: 'Name', width: 170 },
    {
      field: 'sex',
      headerName: 'Sex',
      width: 130,
      valueGetter: ({ row }) => row.sex.charAt(0).toUpperCase() + row.sex.slice(1),
    },
    {
      field: 'place_birth_date',
      headerName: 'Place and Date of birth',
      width: 200,
      valueGetter: (params) =>
        `${params.row.birth_place ?? ''}, ${format(
          new Date(params.row.birth_date ?? 0),
          'yyyy.MM.dd',
        )}`,
    },
    {
      field: 'groups',
      headerName: 'Groups',
      width: 200,
      align: 'right',
      headerAlign: 'right',
      renderCell: ({ value }) => <Groups value={value} />,
    },
    {
      field: 'action',
      headerName: '',
      width: 50,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => (
        <Tooltip title="Delete" placement="top">
          <IconButton
            className="Mui-table-action"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIdDeleteStudent(row.id);
              setOpenDeleteDialog(true);
            }}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ height: 100, pt: 3.4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography
              alignItems="center"
              sx={{ display: 'flex', textTransform: 'uppercase' }}
              fontWeight={500}
            >
              <PermIdentityIcon sx={{ mr: 1 }} />
              {studentData?.paginate?.total_record ?? '-'}{' '}
              {pluralize('Student', studentData?.paginate?.total_record ?? 0)}
            </Typography>

            <StudentCreate />
          </Stack>
        </Stack>
      </Box>

      <Box style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={studentData?.data ?? []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            handleAddRow(newSelectionModel);
          }}
          selectionModel={selected}
          sx={{
            border: 'none',
            '& .Mui-table-action': {
              visibility: 'hidden',
              cursor: 'pointer',
            },
            '& .MuiDataGrid-row': {
              '&:hover, &.Mui-selected': {
                '.Mui-table-action': {
                  visibility: 'visible',
                },
                '.Mui-table-view-detail': {
                  display: 'none',
                },
              },
            },
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '& .MuiDataGrid-columnSeparator--sideRight': {
              display: 'none',
            },
          }}
        />
      </Box>

      <StudentEdit initValue={initValue} handleClose={handleCloseEdit} />

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleSubmit={handleSubmitDeleteStudent}
        title="Confirm Delete Student"
        description="Are you sure, you want to delete this student?"
      />
    </>
  );
}
