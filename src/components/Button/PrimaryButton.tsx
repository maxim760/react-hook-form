import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { WithChildren } from "../../types";
import { makeStyles } from "@material-ui/core/styles";

type PrimaryButtonProps = WithChildren<ButtonProps>;

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3,0,2)
  }
}));

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  ...props
}) => {
  const styles = useStyles();
  return (
    <Button
      className={styles.root}
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
      {...props}
    >
      {children}
    </Button>
  );
};
