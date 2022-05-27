import { LoadingButton } from '@mui/lab';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { format } from 'date-fns';
import { FormikProps, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { HTMLInputTypeAttribute } from 'react';
import {
  API_GROUP,
  GroupAPI,
  IGroupDetail,
  IGroupFormValues,
  IPaginate,
  IStudent,
} from '../../../../apis';
import { useFetch, useHome } from '../../../../hooks';
import groupValidationSchema from './groupValidateionSchema';

interface AppTextFieldProps {
  formik: FormikProps<IGroupFormValues>;
  name: keyof IGroupFormValues;
  label: string;
  type?: HTMLInputTypeAttribute;
  required?: boolean;
}

const AppTextField = ({
  formik,
  name,
  label,
  type = 'text',
  required = false,
}: AppTextFieldProps) => (
  <TextField
    required={required}
    fullWidth
    type={type}
    id={name}
    name={name}
    label={label}
    value={formik.values[name]}
    onChange={formik.handleChange}
    error={formik.touched[name] && Boolean(formik.errors[name])}
    helperText={formik.touched[name] && formik.errors[name]}
  />
);

const initialValues: IGroupFormValues = {
  name: '',
  subject: '',
  date_start: null,
  time_start: null,
  leader_id: undefined,
};

const convertToFormValues = (initValue: IGroupDetail): IGroupFormValues => {
  return {
    name: initValue.name,
    subject: initValue.subject,
    date_start: new Date(initValue.date_start),
    time_start: new Date(initValue.date_start),
    leader_id: initValue.leader.id,
  };
};

const combineDateStart = (dateStart: Date | null, timeStart: Date | null) => {
  return dateStart && timeStart
    ? `${format(dateStart, 'yyyy/MM/dd')} ${format(timeStart, 'HH:mm:ss')}`
    : '';
};

export interface IDataStudent {
  data: IStudent[];
  paginate: IPaginate;
}

export default function GroupFormCreate({
  onClose,
  initValue,
}: {
  onClose: () => void;
  initValue?: IGroupDetail;
}) {
  const { handleReFetchGroup, handleReFetchDashboardStats } = useHome();
  const { enqueueSnackbar } = useSnackbar();
  const {
    state: { data: studentData },
  } = useFetch<IDataStudent>({
    url: API_GROUP.GET_LIST_LEADER,
    api: GroupAPI.getListLeader,
  });

  const formik: FormikProps<IGroupFormValues> = useFormik({
    enableReinitialize: true,
    initialValues: initValue ? convertToFormValues(initValue) : initialValues,
    validationSchema: groupValidationSchema,
    onSubmit: async (values: IGroupFormValues) => {
      try {
        let response;

        if (initValue?.id) {
          response = await GroupAPI.editGroup(initValue?.id)({
            ...values,
            date_start: combineDateStart(values.date_start, values.time_start),
          });
        } else {
          response = await GroupAPI.createGroup({
            ...values,
            date_start: combineDateStart(values.date_start, values.time_start),
          });
        }

        if (response.data.id) {
          enqueueSnackbar(`${initValue?.id ? 'Edit' : 'Create'} group success!`, {
            variant: 'success',
          });
          onClose();
          handleReFetchGroup();
          console.log('////');
          handleReFetchDashboardStats();
        }
      } catch {
        console.error('ERROR');
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 1 }} noValidate>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item sm={12}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <AppTextField formik={formik} name="name" label="Name" required />
            </Grid>

            <Grid item sm={6}>
              <AppTextField formik={formik} name="subject" label="Subject" required />
            </Grid>

            <Grid item sm={6}>
              <DatePicker
                label="Date start"
                value={formik.values.date_start}
                onChange={(newValue) => {
                  formik.setFieldValue('date_start', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    name="date_start"
                    {...params}
                    error={formik.touched['date_start'] && Boolean(formik.errors['date_start'])}
                    helperText={formik.touched['date_start'] && formik.errors['date_start']}
                  />
                )}
              />
            </Grid>

            <Grid item sm={6}>
              <TimePicker
                label="Time start"
                value={formik.values.time_start}
                onChange={(newValue) => {
                  formik.setFieldValue('time_start', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    name="time_start"
                    {...params}
                    error={formik.touched['time_start'] && Boolean(formik.errors['time_start'])}
                    helperText={formik.touched['time_start'] && formik.errors['time_start']}
                  />
                )}
              />
            </Grid>

            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel
                  error={formik.touched['leader_id'] && Boolean(formik.errors['leader_id'])}
                  required
                  id="demo-simple-select-helper-label"
                >
                  Leader
                </InputLabel>

                <Select
                  value={formik.values.leader_id}
                  label="Leader *"
                  onChange={(event) => {
                    formik.setFieldValue('leader_id', event.target.value);
                  }}
                  error={formik.touched['leader_id'] && Boolean(formik.errors['leader_id'])}
                >
                  <MenuItem value={undefined} key="undefined">
                    None
                  </MenuItem>
                  {studentData?.data?.map((student: IStudent) => (
                    <MenuItem value={student.id} key={student.id}>
                      {student.name}
                    </MenuItem>
                  ))}
                </Select>

                {formik.touched['leader_id'] && (
                  <FormHelperText error={Boolean(formik.errors['leader_id'])}>
                    {formik.errors['leader_id']}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={4}>
          <Button color="primary" variant="outlined" fullWidth type="button" onClick={onClose}>
            {formik.isSubmitting ? 'Close' : 'Cancel'}
          </Button>
        </Grid>

        <Grid item sm={4}>
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            startIcon={<div></div>}
            loading={formik.isSubmitting}
            loadingPosition="start"
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
