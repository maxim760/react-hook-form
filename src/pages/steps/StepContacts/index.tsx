import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, {
  isPossiblePhoneNumber,
  parsePhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import ru from "react-phone-number-input/locale/ru.json";

import { Form, Input, MainContainer, PrimaryButton } from "../../../components";
import {
  DataNames,
  IData,
  useDataContext,
} from "../../../contexts/DataContext";
import { ROUTE_NAMES } from "../../../utils/routes";

const schema = yup.object().shape({
  [DataNames.email]: yup
    .string()
    .email("Email should have correct format")
    .required("Email is a required field"),
  [DataNames.hasPhone]: yup.boolean(),
  [DataNames.phone]: yup
    .string()
    .nullable()
    .when(DataNames.hasPhone, (hasPhone: any, schema: any) => {
      return schema.test({
        test: (value: any) => {
          if (!hasPhone) {
            return true;
          }
          if (typeof value === "string") {
            return isPossiblePhoneNumber(value);
          }
          return true;
        },
        message: "The phone should have the right format",
      });
    }),
});

export const StepContactsPage: React.FC = ({}) => {
  const { data, setValues } = useDataContext();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: {
      [DataNames.email]: data[DataNames.email],
      [DataNames.hasPhone]: data[DataNames.hasPhone],
      [DataNames.phone]: data[DataNames.phone],
    },
  });

  const hasPhone = !!watch(DataNames.hasPhone);
  const [phoneNumber, setPhoneNumber] = useState(
    formatPhoneNumberIntl(data[DataNames.phone] || "") || ""
  );
  const onSubmit = (data: Partial<IData>) => {
    setValues({
      ...data,
      [DataNames.phone]: data[DataNames.hasPhone]
        ? parsePhoneNumber(data[DataNames.phone] || "")?.number
        : null,
      [DataNames.hasPhone]: !!data[DataNames.hasPhone]
    });
    history.push(ROUTE_NAMES.STEP_FILES);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        Step 2 | Contacts
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          label="Email"
          required
          {...register(DataNames.email)}
          error={!!errors[DataNames.email]}
          helperText={errors[DataNames.email]?.message}
        />
        <Controller
          name={DataNames.hasPhone}
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox checked={hasPhone} color="primary" />}
              label="Do you have a phone?"
              {...field}
            />
          )}
        />
        {hasPhone && (
          <PhoneInput
            labels={ru}
            international
            {...register(DataNames.phone)}
            countryOptionsOrder={["RU", "UA", "BY", "|"]}
            value={phoneNumber}
            onChange={setPhoneNumber}
            defaultCountry="RU"
            //@ts-ignore
            error={!!errors[DataNames.phone]}
            //@ts-ignore
            helperText={errors[DataNames.phone]?.message}
            //@ts-ignore
            countryCallingCodeEditable={false}
            inputComponent={Input}
          />
        )}

        <PrimaryButton>Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
