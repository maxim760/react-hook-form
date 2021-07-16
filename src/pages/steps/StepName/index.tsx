import React from "react";
import Typography from "@material-ui/core/Typography";
import { FieldError, useForm } from "react-hook-form";
import { Form, Input, MainContainer, PrimaryButton } from "../../../components";
import {
  IData,
  DataNames,
  useDataContext,
} from "../../../contexts/DataContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
import { ROUTE_NAMES } from "../../../utils/routes";

type IStepData = Pick<IData, DataNames.firstName | DataNames.lastName>;

const schema = yup.object().shape({
  [DataNames.firstName]: yup
    .string()
    .matches(/^[\D]*$/gi, "First name should not contain numbers")
    .required("First name is a required field"),
  [DataNames.lastName]: yup
    .string()
    .matches(/^(\D)*$/gi, "Last name should not contain numbers")
    .required("Last name is a required field"),
});

const formNames: { name: keyof IStepData; label: string }[] = [
  { name: DataNames.firstName, label: "First Name" },
  { name: DataNames.lastName, label: "Last Name" },
];

export const StepNamePage: React.FC = () => {
  const history = useHistory();
  const { data, setValues } = useDataContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      [DataNames.firstName]: data[DataNames.firstName],
      [DataNames.lastName]: data[DataNames.lastName],
    },
  });

  const onSubmit = (data: IStepData) => {
    setValues(data);
    history.push(ROUTE_NAMES.STEP_CONTACTS);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 1 | Name
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {formNames.map(({ name, label }) => {
          const currentError = errors[name] as FieldError | undefined;
          return (
            <Input
              key={name}
              {...register(name)}
              type="text"
              label={label}
              error={!!currentError}
              helperText={currentError?.message}
            />
          );
        })}
        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
