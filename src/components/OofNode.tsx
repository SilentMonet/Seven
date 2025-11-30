import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import type { OofNodeMeta } from '../api/types';
import { formatFileSize, formatDate } from '../utils';

interface OofNodeProps {
  meta: OofNodeMeta;
  onClick?: () => void;
}

export const OofNode: React.FC<OofNodeProps> = ({ meta, onClick }) => {
  const isFolder = !meta.sha;
  const icon = isFolder ? <FolderIcon /> : <DescriptionIcon />;

  const formattedDate = formatDate(meta.te);
  const formattedSize = formatFileSize(meta.s);

  const secondaryText = (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap'}}>
      {!isFolder && (
        <Typography variant="caption" component="span">
          {formattedSize}
        </Typography>
      )}
      <Typography variant="caption" component="span">
        {formattedDate}
      </Typography>
    </Box>
  );

  return (
    <ListItem
      onClick={onClick}
      sx={{
        '& .MuiListItemText-root': {
          margin: 0,
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-word',
            }}
          >
            {meta.n}
          </Typography>
        }
        slotProps={{secondary: {component: 'div'}}}
        secondary={secondaryText}
      />
    </ListItem>
  );
};
