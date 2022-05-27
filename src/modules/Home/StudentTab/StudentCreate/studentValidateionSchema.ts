import * as yup from 'yup';

const studentValidationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  name: yup.string().required('Name is required'),
  birth_date: yup.string().nullable().required('Birthdate is required'),
  birth_place: yup.string().required('Place of Birth is required'),
  sex: yup.string().required('Gender is required'),
  group_ids: yup.array().ensure().min(1, 'Groups is required'),
});

export default studentValidationSchema;
