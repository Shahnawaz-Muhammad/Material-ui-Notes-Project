import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormLabel,
  FormControl,
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(
  createStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
      width: '50%',
      display: 'block',
    },
  })
);

const Create = () => {
  const classes = useStyles();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleError(false);
    setDescriptionError(false);
    setCategoryError(false);

    if (title === '') {
      setTitleError(true);
    }
    if (description === '') {
      setDescriptionError(true);
    }
    if (category === '') {
      setCategoryError(true);
    }
    if (title && description && category) {
      fetch('http://localhost:4000/notes', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ title, description, category }),
      }).then(() => history.push('/'));
    }
  };
  return (
    <div>
      <Container>
        <Typography
          variant='h6'
          color='textSecondary'
          component='h2'
          gutterBottom
        >
          Create a new Note!
        </Typography>

        <form noValidate autoComplete='OFF' onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            label='Note Title'
            variant='outlined'
            color='primary'
            fullWidth
            required
            className={classes.field}
            error={titleError}
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            label='Description'
            variant='outlined'
            color='primary'
            multiline
            rows={4}
            fullWidth
            required
            className={classes.field}
            error={descriptionError}
          />

          <FormControl className={classes.field} error={categoryError} required>
            <FormLabel>Note Category</FormLabel>
            <RadioGroup
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value='money'
                control={<Radio />}
                label='Money'
              />
              <FormControlLabel
                value='todos'
                control={<Radio />}
                label='Todos'
              />
              <FormControlLabel
                value='reminders'
                control={<Radio />}
                label='Reminders'
              />
              <FormControlLabel value='work' control={<Radio />} label='Work' />
            </RadioGroup>
          </FormControl>

          <Button
            type='submit'
            color='primary'
            variant='contained'
            endIcon={<KeyboardArrowRightIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Create;
