import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { DropzoneDialog, FileObject } from 'material-ui-dropzone';
import { uploadAssets } from '../models/Asset';

const useStyles = makeStyles((theme) => ({
  toolbarbutton: {
    margin: '5px'
  },
}));

export default function UploadAsset(props: { folderId: number, onUploadAssets: () => void }) {
  const classes = useStyles();
  const [dialogOpen, dialogSetOpen] = React.useState(false);
  let uploadedFiles: FileObject[] = [];

  const onSaveFiles = async (files: any) => {
    await uploadAssets(files, props.folderId);
    dialogSetOpen(false);
    props.onUploadAssets();
  }

  return (
    <div className={classes.toolbarbutton}>
      <Button variant="contained" color="default" startIcon={<CloudUpload />} onClick={() => dialogSetOpen(true)}> Upload </Button>
      <DropzoneDialog
        acceptedFiles={['image/*']}
        cancelButtonText={"cancel"}
        submitButtonText={"submit"}
        maxFileSize={5000000}
        open={dialogOpen}
        fileObjects={uploadedFiles}
        onClose={() => dialogSetOpen(false)}
        onSave={onSaveFiles}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
}