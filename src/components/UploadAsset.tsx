import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import { DropzoneDialog, FileObject } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  toolbarbutton: {
    margin: '5px'
  },
}));

export default function UploadAsset() {
  const classes = useStyles();
  const [dialogOpen, dialogSetOpen] = React.useState(false);
  let uploadedFiles: FileObject[] = [];

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
        onSave={(files: any) => {
          console.log('Files:', files);
          dialogSetOpen(false);
        }}
        showPreviews={true}
        showFileNamesInPreview={true}
      />
    </div>
  );
}