import { Grid } from '@mui/material';
import { GroupTable, GroupFilter } from '.';

const GroupTab = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <GroupFilter />
      </Grid>

      <Grid item xs={9}>
        <GroupTable />
      </Grid>
    </Grid>
  );
};

export default GroupTab;
