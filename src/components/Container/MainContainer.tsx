import React, { Component, ReactElement } from "react";
import Container from "@material-ui/core/Container";
import { OverridableTypeMap, OverrideProps } from "@material-ui/core/OverridableComponent";
import { makeStyles } from "@material-ui/core/styles";

type MainContainerProps = OverrideProps<OverridableTypeMap, any> & {
  children: string | number | boolean | {} | ReactElement<any, string | ((props: any) => ReactElement<any, any> | null) | (new (props: any) => Component<any, any, any>)>
}

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: 'flex',
    alignItems: 'center',
    flexDirection: "column"
  }
}))

export const MainContainer: React.FC<MainContainerProps> = ({ children, ...props }) => {
  const styles = useStyles()
  return (
    <Container component="main" maxWidth="xs" className={styles.root} {...props}>
      {children}
    </Container>
  );
};
