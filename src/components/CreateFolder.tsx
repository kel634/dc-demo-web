import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@material-ui/core';
import { CreateNewFolder as CreateNewFolderIcon } from '@material-ui/icons';
import { createFolder } from '../models/Folder';

const useStyles = makeStyles((theme) => ({
  toolbarbutton: {
    margin: '5px'
  },
}));

export default function CreateFolder(props: { parentId: number, onFolderCreate: (folderId: number) => void}) {
  const classes = useStyles();
  const [dialogOpen, dialogSetOpen] = React.useState(false);
  const [folderName, setFolderName] = React.useState("");

  const handleClickOpen = () => {
    dialogSetOpen(true);
  };

  const handleClose = () => {
    dialogSetOpen(false);
  };

  const handleCreateNewFolder = () => {
    createFolder(props.parentId, folderName)
      .then(f => {
        props.onFolderCreate(f.folderId);
        handleClose();
      });
  }

  return (
    <div className={classes.toolbarbutton}>
      <Button variant="contained" color="default" startIcon={<CreateNewFolderIcon />} onClick={handleClickOpen}></Button>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add new folder</DialogTitle>
        <DialogContent>
          <TextField
            onChange={event => setFolderName(event.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Folder Name"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateNewFolder} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}