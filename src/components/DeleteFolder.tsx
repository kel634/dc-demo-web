import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { deleteFolder } from '../models/Folder';

const useStyles = makeStyles((theme) => ({
  toolbarbutton: {
    margin: '5px'
  },
}));

export default function DeleteFolder(props: { parentId: number, onFolderDelete: (folderId: number) => void}) {
  const classes = useStyles();
  const [dialogOpen, dialogSetOpen] = React.useState(false);

  const handleClickOpen = () => {
    dialogSetOpen(true);
  };

  const handleClose = () => {
    dialogSetOpen(false);
  };

  const handleDeleteFolder = () => {
    deleteFolder(props.parentId)
      .then(f => {
        props.onFolderDelete(f.folderId);
        handleClose();
      });
  }

  return (
    <div className={classes.toolbarbutton}>
      <Button variant="contained" color="default" startIcon={<DeleteIcon />} onClick={handleClickOpen}>Delete Folder</Button>
      <Dialog open={dialogOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
        <DialogContentText>
          (The folder's assets will be moved to the parent folder)
        </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteFolder} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}