// src/components/PersonnelCard.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, IconButton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const PersonnelCard = ({ name, title, description, details, image }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto' }}>
      <CardHeader
        title={name}
        subheader={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default PersonnelCard;
