import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../../utils/routes";

export const AppRouter: React.FC = ({}) => {
  return (
    <Switch>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
    </Switch>
  );
};
