import React from "react";
import { Link } from "react-router-dom";
import { Result } from "../../components";
import { useDataContext } from "../../contexts/DataContext";
import { ROUTE_NAMES } from "../../utils/routes";

export const ResultPage: React.FC = ({}) => {
  return <Result />;
};
