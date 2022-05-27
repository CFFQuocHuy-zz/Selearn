import { Box, Typography } from '@mui/material';
import { HomeProvider, HomeTabName, useHome } from '../../hooks';
import { GroupTab, HomeTabs, StudentTab } from '../../modules';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const HomePage = () => {
  const { tabValue } = useHome();

  return (
    <>
      <HomeTabs />

      <TabPanel value={tabValue} index={HomeTabName.STUDENT_TAB}>
        <StudentTab />
      </TabPanel>

      <TabPanel value={tabValue} index={HomeTabName.GROUP_TAB}>
        <GroupTab />
      </TabPanel>
    </>
  );
};

export default function HomePageProvider() {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
}
