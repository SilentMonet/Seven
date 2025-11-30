import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
} from '@mui/material';
import type { OofNodeMeta } from '../api/types';
import { formatFileSize, formatDate } from '../utils';
import { OofNodeIcon } from './OofNodeIcon';

interface OofNodeProps {
  meta: OofNodeMeta;
  onClick?: () => void;
}

export const OofNode: React.FC<OofNodeProps> = ({ meta, onClick }) => {
  const isFolder = !meta.sha;

  const formattedDate = formatDate(meta.te);
  const formattedSize = formatFileSize(meta.s);

  const secondaryText = (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
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
      <ListItemIcon>
        <OofNodeIcon nodeMeta={meta} />
      </ListItemIcon>
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
        slotProps={{ secondary: { component: 'div' } }}
        secondary={secondaryText}
      />
    </ListItem>
  );
};
