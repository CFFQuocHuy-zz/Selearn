import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import GroupsIcon from '@mui/icons-material/Groups';
import { Box, Pagination, Stack, Typography, IconButton, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import pluralize from 'pluralize';
import { useState } from 'react';
import { GroupCreate, GroupEdit } from '../';
import { GroupAPI, IGroup } from '../../../../apis';
import { DeleteDialog } from '../../../../components';
import { HomeTabName, useHome } from '../../../../hooks';

export default function GroupTable() {
  const {
    selected,
    handleAddRow,
    groupData,
    handleReFetchGroup,
    handleCheckedFilterGroup,
    handleChangeTab,
    handleReFetchDashboardStats,
    handleReFetchStudent,
  } = useHome();
  const { enqueueSnackbar } = useSnackbar();

  // EDIT LOGIC
  const [initValue, setInitValue] = useState<IGroup | undefined>(undefined);
  const handleCloseEdit = () => {
    setInitValue(undefined);
  };

  // DELETE LOGIC
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idDeleteGroup, setIdDeleteGroup] = useState(0);
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  const handleSubmitDeleteGroup = async () => {
    try {
      const response = await GroupAPI.deleteGroup(idDeleteGroup);
      if (response?.data) {
        enqueueSnackbar(`Delete group success!`, {
          variant: 'success',
        });
        handleReFetchGroup();
        handleReFetchDashboardStats();
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
      width: 50,
      sortable: false,
      filterable: false,
      renderCell: ({ value, row }) => (
        <>
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
    {
      field: 'name',
      headerName: 'Name',
      width: 170,
      renderCell: ({ value, row }) => <Typography>{value}</Typography>,
    },
    {
      field: 'subject',
      headerName: 'Subject',
      width: 170,
    },
    {
      field: 'leader.name',
      headerName: 'Leader',
      width: 170,
      valueGetter: (params) => params.row.leader.name,
    },
    {
      field: 'action',
      headerName: '',
      width: 100,
      align: 'center',
      headerAlign: 'center',
      renderCell: ({ row }) => (
        <>
          <Tooltip title="Delete" placement="top">
            <IconButton
              className="Mui-table-action"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIdDeleteGroup(row.id);
                setOpenDeleteDialog(true);
              }}
            >
              <DeleteForeverIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="View students" placement="top">
            <IconButton
              className="Mui-table-action"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleCheckedFilterGroup([row.id]);
                handleChangeTab(HomeTabName.STUDENT_TAB);
              }}
            >
              <PermIdentityIcon />
            </IconButton>
          </Tooltip>
        </>
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
              <GroupsIcon sx={{ mr: 1 }} />
              {groupData?.paginate?.total_record ?? '-'}{' '}
              {pluralize('Group', groupData?.paginate?.total_record ?? 0)}
            </Typography>

            <GroupCreate />
          </Stack>
        </Stack>
      </Box>

      <Box style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={groupData?.data ?? []}
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

      <GroupEdit initValue={initValue} handleClose={handleCloseEdit} />

      <DeleteDialog
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleSubmit={handleSubmitDeleteGroup}
        title="Confirm Delete Group"
        description="Are you sure, you want to delete this group?"
      />
    </>
  );
}
