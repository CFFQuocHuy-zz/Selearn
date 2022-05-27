import { Grid } from '@mui/material';
import { StudentTable, StudentFilter } from '.';

const StudentTab = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <StudentFilter />
      </Grid>

      <Grid item xs={9}>
        <StudentTable />
      </Grid>
    </Grid>
  );
};

export default StudentTab;
