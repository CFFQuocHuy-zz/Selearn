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
import OutlinedInput from '@mui/material/OutlinedInput';
import { Box } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { FormikProps, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import React, { HTMLInputTypeAttribute } from 'react';
import { IGroup, IStudent, IStudentFormValues, StudentAPI } from '../../../../apis';
import { useHome } from '../../../../hooks';
import studentValidationSchema from './studentValidateionSchema';

interface AppTextFieldProps {
  formik: FormikProps<IStudentFormValues>;
  name: 'name' | 'sex' | 'email' | 'birth_place' | 'birth_date' | 'group_ids';
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

const initialValues: IStudentFormValues = {
  avatar: '',
  name: '',
  email: '@example.com',
  sex: '',
  group_ids: [],
  birth_date: null,
  birth_place: '',
};

const convertToFormValues = (initValue: IStudent): IStudentFormValues => {
  return {
    avatar: initValue.avatar,
    name: initValue.name,
    email: initValue.email,
    sex: initValue.sex,
    group_ids: initValue.groups.map((v: IGroup) => v.id),
    birth_date: new Date(initValue.birth_date),
    birth_place: initValue.birth_place,
  };
};

export default function StudentFormCreate({
  onClose,
  initValue,
}: {
  onClose: () => void;
  initValue?: IStudent;
}) {
  const { groupData, handleReFetchStudent, handleReFetchDashboardStats } = useHome();
  const { enqueueSnackbar } = useSnackbar();

  const formik: FormikProps<IStudentFormValues> = useFormik({
    enableReinitialize: true,
    initialValues: initValue ? convertToFormValues(initValue) : initialValues,
    validationSchema: studentValidationSchema,
    onSubmit: async (values: IStudentFormValues) => {
      try {
        let response;

        if (initValue?.id) {
          response = await StudentAPI.editStudent(initValue?.id)({
            ...values,
            birth_date: values.birth_date ? format(values.birth_date, 'yyyy/MM/dd') : '',
          });
        } else {
          response = await StudentAPI.createStudent({
            ...values,
            birth_date: values.birth_date ? format(values.birth_date, 'yyyy/MM/dd') : '',
          });
        }

        if (response.data.id) {
          enqueueSnackbar(`${initValue?.id ? 'Edit' : 'Create'}  student success!`, {
            variant: 'success',
          });
          onClose();
          handleReFetchStudent();
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
              <AppTextField formik={formik} name="email" label="Email" required />
            </Grid>
            <Grid item sm={6}>
              <DatePicker
                label="Date of Birth"
                value={formik.values.birth_date}
                onChange={(newValue) => {
                  formik.setFieldValue('birth_date', newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    name="birth_date"
                    {...params}
                    error={formik.touched['birth_date'] && Boolean(formik.errors['birth_date'])}
                    helperText={formik.touched['birth_date'] && formik.errors['birth_date']}
                  />
                )}
              />
            </Grid>
            <Grid item sm={6}>
              <AppTextField formik={formik} name="birth_place" label="Place of Birth" required />
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel
                  error={formik.touched['sex'] && Boolean(formik.errors['sex'])}
                  required
                  id="demo-simple-select-helper-label"
                >
                  Gender
                </InputLabel>
                <Select
                  value={formik.values.sex}
                  label="Gender *"
                  onChange={(event) => {
                    formik.setFieldValue('sex', event.target.value);
                  }}
                  error={formik.touched['sex'] && Boolean(formik.errors['sex'])}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {formik.touched['sex'] && (
                  <FormHelperText error={Boolean(formik.errors['sex'])}>
                    {formik.errors['sex']}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item sm={12}>
              <FormControl fullWidth>
                <InputLabel
                  error={formik.touched['group_ids'] && Boolean(formik.errors['group_ids'])}
                  required
                  id="groups"
                >
                  Groups
                </InputLabel>
                <Select
                  labelId="groups"
                  id="groups"
                  multiple
                  value={formik.values.group_ids}
                  onChange={(event) => {
                    const newValue =
                      typeof event.target.value === 'string'
                        ? event.target.value.split(',')
                        : event.target.value;
                    if (newValue.length < 5) formik.setFieldValue('group_ids', newValue);
                  }}
                  input={
                    <OutlinedInput
                      error={formik.touched['group_ids'] && Boolean(formik.errors['group_ids'])}
                      label="Groups *"
                    />
                  }
                >
                  {groupData?.data?.map((group: IGroup) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched['group_ids'] && (
                  <FormHelperText error={Boolean(formik.errors['group_ids'])}>
                    {formik.errors['group_ids']}
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
