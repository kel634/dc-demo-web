import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AssetCard from './AssetCard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneDialog, FileObject } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function Album() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let uploadedFiles: FileObject[] = [];

  return (
    <React.Fragment>
      <main>
        <AppBar position="relative">
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap>
              Album layout
            </Typography>
            <Button variant="contained" color="default" startIcon={<CloudUploadIcon />}
              onClick={() => setOpen(true)}>
              Upload
            </Button>

            <DropzoneDialog
              acceptedFiles={['image/*']}
              cancelButtonText={"cancel"}
              submitButtonText={"submit"}
              maxFileSize={5000000}
              open={open}
              fileObjects={uploadedFiles}
              onClose={() => setOpen(false)}
              onSave={(files: any) => {
                console.log('Files:', files);
                setOpen(false);
              }}
              showPreviews={true}
              showFileNamesInPreview={true}
            />
          </Toolbar>
        </AppBar>
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <AssetCard card={card} />
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}