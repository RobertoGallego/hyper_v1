import { useState } from 'react';

export const useForForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onPick = (event) => {
    setValues({ ...values });
    console.log(event);
    // console.log(setValues);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    onPick,
    values
  };
};
