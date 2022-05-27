import * as yup from 'yup';

const studentValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  date_start: yup.string().nullable().required('Date start is required'),
  time_start: yup.string().nullable().required('Time start is required'),
  leader_id: yup.number().required('Leader is required'),
});

export default studentValidationSchema;
