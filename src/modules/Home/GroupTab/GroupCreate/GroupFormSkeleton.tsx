import { LoadingButton } from '@mui/lab';
import { Button, Grid, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function GroupFormSkeleton({ onClose }: { onClose: () => void }) {
  return (
    <Box component="form" sx={{ p: 1 }} noValidate>
      <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
        <Grid item sm={12}>
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Typography component="div" variant="h3">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography component="div" variant="h3">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography component="div" variant="h3">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography component="div" variant="h3">
                <Skeleton />
              </Typography>
            </Grid>
            <Grid item sm={12}>
              <Typography component="div" variant="h3">
                <Skeleton />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={4}>
          <Button color="primary" variant="outlined" fullWidth type="button" onClick={onClose}>
            Cancel
          </Button>
        </Grid>

        <Grid item sm={4}>
          <LoadingButton
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            startIcon={<div></div>}
            loading={true}
            loadingPosition="start"
          >
            Submit
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  );
}
