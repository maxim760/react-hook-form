import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { FilesList, MainContainer, PrimaryButton } from "..";
import { DataNames, useDataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ROUTE_NAMES } from "../../utils/routes";
import { isNil } from "../../utils/isNil";
import { formatPhoneNumber } from "react-phone-number-input";
import Swal from "sweetalert2";
import Confetti from "react-confetti";

const EmptyValue = "unknown";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#4296b3",
    fontStyle: "italic",
    position: "relative",
    fontSize: "1.2rem",
    marginTop: "15px",
    transition: "transform 0.25s ease-in",
    overflow: "hidden",
    paddingBottom: "4px",
    "&::after": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "2px",
      left: "0px",
      bottom: "0px",
      backgroundColor: "#4296b3",
      transformOrigin: "right",
      transform: "scaleX(0)",
      willChange: "transform",
      transition: "transform 0.25s ease-in",
    },
    "&:hover::after": {
      transformOrigin: "left",
      transform: "scaleX(1)",
    },
  },
  fileTitle: {
    margin: theme.spacing(2,0,0)
  },
  title: {
    margin: theme.spacing(0,0,1)
  }
}));

export const Result: React.FC = () => {
  const { data } = useDataContext();
  const styles = useStyles();
  const [isSuccess, setIsSuccess] = useState(false);

  const [entries, files] = Object.entries(data).reduce(
    ([entries, files]: [[string, any][], File[]], [key, value]) => {
      if (key === DataNames.files) {
        return [entries, [...files, ...(value as File[])]];
      }
      if (key === DataNames.phone && value) {
        value = formatPhoneNumber(value as string);
      }
      const pair: [string, any] = [key, value];
      return [[...entries, pair], files];
    },
    [[], []]
  );

  const onClickSubmit = async (e: React.MouseEvent) => {
    const formData = new FormData();
    if (files) {
      files.forEach((file) => {
        formData.append(DataNames.files, file, file.name)
      })
    }
    entries.forEach(([key, value]) => {
      formData.append(key, value)
    })

    // const response = await fetch("url", {
    //   method: "POST",
    //   body: formData
    // })

    Swal.fire("Great Job!", "You've passed the challenge", "success").then(_ => {
      setIsSuccess(false)
    })
    setIsSuccess(true)

  }

  if (isSuccess) {
    return <Confetti />
  }

  return (
    <MainContainer>
      <Typography className={styles.title} variant="h5" component="h2">
        Form Values
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell align="right">value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell align="right">{!isNil(value) ? value.toString() : EmptyValue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {files?.length > 0 && (
        <>
          <Typography className={styles.fileTitle} variant="h5" component="h2">
            Files
          </Typography>
          <FilesList list={files} />
        </>
      )}
      <PrimaryButton onClick={onClickSubmit}>Submit</PrimaryButton>
      <Link className={styles.link} to={ROUTE_NAMES.STEP_NAME}>
        Start Over
      </Link>
    </MainContainer>
  );
};
