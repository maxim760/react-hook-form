import React from "react";
import Paper from "@material-ui/core/Paper";
import CloudUpload from "@material-ui/icons/CloudUpload";
import { makeStyles } from "@material-ui/core/styles";
import Dropzone from "react-dropzone";
import { Controller, Control, UseFormRegister } from "react-hook-form";
import { FilesList } from "..";

type FileInputProps = {
  control: Control<any>;
  name: `${string}`;
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eee",
    textAlign: "center",
    cursor: "pointer",
    marginTop: "20px",
    color: "#333",
    padding: "10px",
  },
}));

export const FileInput: React.FC<FileInputProps> = ({ control, name }) => {
  const styles = useStyles();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field: { onBlur, onChange, value } }) => (
        <>
          <Dropzone onDrop={onChange}>
            {({ getRootProps, getInputProps }) => (
              <Paper
                className={styles.root}
                variant="outlined"
                {...getRootProps()}
              >
                <CloudUpload />
                <input {...getInputProps()} name={name} onBlur={onBlur} />
                <p>Drag and Drops files here, or select files</p>
              </Paper>
            )}
          </Dropzone>
          <FilesList list={value} />
        </>
      )}
    />
  );
};
