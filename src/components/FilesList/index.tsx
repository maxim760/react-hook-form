import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";

import InsertDriveFile from "@material-ui/icons/InsertDriveFile";

import { formatBytes } from "../../utils/formatBytes";
interface FilesListProps {
  list: File[];
}

const useStyles = makeStyles((theme) => ({
  list: {
    padding: 0
  },
  item: {
    "&:first-of-type": {
      paddingTop: 0,
    }
  },
  icon: { 
    fontSize: "42px",
    color: "#888"
  }
}))

export const FilesList: React.FC<FilesListProps> = ({ list }) => {
  const styles = useStyles()
  return (
    <List className={styles.list}>
      {list.map((file: any, i: any) => (
        <ListItem className={styles.item} key={i}>
          <ListItemIcon className={styles.icon}>
            <InsertDriveFile />
          </ListItemIcon>
          <ListItemText
            primary={file.name}
            secondary={formatBytes(file.size)}
          />
        </ListItem>
      ))}
    </List>
  );
};
