import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, Typography } from '@mui/material';
import React from 'react';
import { useHome } from '../../../../hooks';

const GroupFilter = () => {
  const { handleSearchGroup, searchGroup } = useHome();

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
            defaultValue={searchGroup}
            onChange={handleSearchGroup}
            sx={{ ml: 1, flex: 1, backgroundColor: 'neutral.main' }}
            inputProps={{ 'aria-label': 'search student' }}
          />
        </Box>
      </Box>
    </>
  );
};

export default GroupFilter;
