import { Grid, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    info: {
      color: 'grey',
      textAlign: 'center',
      marginBottom: 10,
    },
  })
);

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetch('http://localhost:4000/notes')
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  return (
    <div>
      {notes.map((data) => (
        <div key={data.id}>
          <Grid container className={classes.container}>
            <Grid item sm={3}></Grid>
            <Grid item sm={6}>
              <Typography className={classes.info} variant='h6'>
                {data.title}
              </Typography>
              <Typography className={classes.info} variant='body1'>
                {data.description}
              </Typography>
              <Typography className={classes.info} variant='subtitle1'>
                {data.category}
              </Typography>
            </Grid>
            <Grid item sm={3}></Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default Notes;
