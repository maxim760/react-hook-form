import React from "react";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  MainContainer,
  Form,
  PrimaryButton,
  FileInput,
} from "../../../components";
import {
  useDataContext,
  DataNames,
  IData,
} from "../../../contexts/DataContext";
import { ROUTE_NAMES } from "../../../utils/routes";


export const StepFilesPage: React.FC = () => {
  const { data, setValues } = useDataContext();
  const history = useHistory();
  const { handleSubmit, control } = useForm({
    mode: "onBlur",
    defaultValues: { [DataNames.files]: data[DataNames.files] },
  });

  const onSubmit = (data: Partial<IData>) => {
    setValues(data);
    history.push(ROUTE_NAMES.RESULT);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 3 | Files
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FileInput control={control} name={DataNames.files} />
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
