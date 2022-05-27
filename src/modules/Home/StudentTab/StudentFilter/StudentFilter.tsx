import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Checkbox,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { IGroup } from '../../../../apis';
import { useHome } from '../../../../hooks';

const StudentFilter = () => {
  const { groupData, group_ids, handleCheckedFilterGroup, handleSearchName, search } = useHome();

  return (
    <>
      <Box sx={{ height: 100 }}>
        <Typography variant="h6" sx={{ textTransform: 'uppercase', color: 'neutral.dark' }}>
          Search for name
        </Typography>

        <Box sx={{ backgroundColor: 'neutral.main', display: 'flex', width: '80%' }}>
          <IconButton sx={{ p: '4px', color: 'white' }} aria-label="search">
            <SearchIcon />
          </IconButton>

          <InputBase
            defaultValue={search}
            onChange={handleSearchName}
            sx={{ ml: 1, flex: 1, backgroundColor: 'neutral.main' }}
            inputProps={{ 'aria-label': 'search student' }}
          />
        </Box>
      </Box>

      {groupData && (
        <Box>
          <Typography variant="h6" sx={{ textTransform: 'uppercase', color: 'neutral.dark' }}>
            Filters for study groups
          </Typography>

          <List>
            {groupData.data.map((value: IGroup) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem disablePadding key={value.id}>
                  <ListItemIcon sx={{ minWidth: 24 }}>
                    <Checkbox
                      edge="start"
                      checked={group_ids.indexOf(value.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={() => {
                        handleCheckedFilterGroup(value.id);
                      }}
                    />
                  </ListItemIcon>

                  <ListItemText
                    disableTypography
                    id={labelId}
                    primary={value.name}
                    sx={{ cursor: 'pointer', fontWeight: 500 }}
                    onClick={() => {
                      handleCheckedFilterGroup(value.id);
                    }}
                  />
                </ListItem>
              );
            })}
          </List>
        </Box>
      )}
    </>
  );
};

export default StudentFilter;
