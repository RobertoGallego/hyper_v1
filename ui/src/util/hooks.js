import { useState } from 'react';

export const useForForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    // console.log(values);
  };

  const onPick = (event) => {
    setValues({ ...values, image: event.src});
    // console.log(values);
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
