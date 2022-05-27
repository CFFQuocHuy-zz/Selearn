import { CardContent, styled, Tab, Tabs, Typography } from '@mui/material';
import pluralize from 'pluralize';
import { useHome } from '../../../hooks';

interface IHomeTabProps {
  label: string;
  description: string;
}

const CustomTabs = styled(Tabs)(({ theme }) => ({
  '.MuiTab-root': {
    backgroundColor: theme.palette.neutral.light,
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem',
    textAlign: 'left',
    textTransform: 'none',
    maxWidth: '35%',
    width: '35%',
    alignItems: 'flex-start',
    opacity: 0.6,
    '&.Mui-selected': {
      backgroundColor: '#ffffff',
      opacity: 1,
    },
    '&:not(:last-child)': {
      marginRight: '0.5rem',
    },
  },
  '.MuiTypography-h6': {
    textTransform: 'uppercase',
  },
})) as typeof Tabs;

const HomeTab = ({ label, description }: IHomeTabProps) => {
  return (
    <CardContent>
      <Typography variant="h6" component="h6" fontSize={18} fontWeight={700}>
        {label}
      </Typography>
      <Typography color="text.secondary">{description}</Typography>
    </CardContent>
  );
};

const HomeTabs = () => {
  const { tabValue, handleChangeTab, studentData, dashboardStatsData } = useHome();

  const studentCount = studentData?.paginate?.total_record ?? 0;
  const studentInGroupCount = dashboardStatsData?.data?.student ?? 0;
  const groupCount = dashboardStatsData?.data?.group ?? 0;
  const studentDescription = `${studentCount} ${pluralize('student', studentCount)} registered`;
  const groupDescription = `${groupCount} ${pluralize(
    'study group',
    groupCount,
  )} with ${studentInGroupCount} ${pluralize('student', studentInGroupCount)}`;

  return (
    <CustomTabs
      value={tabValue}
      onChange={(_, tabValue) => handleChangeTab(tabValue)}
      textColor="secondary"
      sx={{ backgroundColor: 'neutral.main' }}
      TabIndicatorProps={{ style: { display: 'none' } }}
      aria-label="administration tabs"
    >
      <Tab label={<HomeTab label="Students" description={studentDescription} />} />

      <Tab label={<HomeTab label="Study Groups" description={groupDescription} />} />
    </CustomTabs>
  );
};

export default HomeTabs;
