import React, { forwardRef, RefObject } from "react";
import TextField from "@material-ui/core/TextField";
import { TextFieldProps } from "@material-ui/core/TextField";

type InputProps = TextFieldProps

export const Input = forwardRef<HTMLInputElement, any>((props: InputProps, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      inputRef={ref}
      fullWidth
      {...props}
    />
  );
});
