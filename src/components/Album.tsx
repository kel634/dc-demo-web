import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AssetCard from './AssetCard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton, Drawer, Divider, ListItem, ListItemText, List } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneDialog, FileObject } from 'material-ui-dropzone';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    justifyContent: 'space-between'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  drawerMenuButton: {
    marginRight: theme.spacing(2),
  },
  drawerHide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

export default function Album() {
  const classes = useStyles();
  const [dialogOpen, dialogSetOpen] = React.useState(false);
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let uploadedFiles: FileObject[] = [];

  const [drawerOpen, drawerSetOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    drawerSetOpen(true);
  };
  const handleDrawerClose = () => {
    drawerSetOpen(false);
  };

  return (
    <React.Fragment>
      <AppBar position="relative">
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.drawerMenuButton, dialogOpen && classes.drawerHide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            Album layout
            </Typography>
          <Button variant="contained" color="default" startIcon={<CloudUploadIcon />}
            onClick={() => dialogSetOpen(true)}>
            Upload
            </Button>

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
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key={1}>
              <ListItemText primary="test" />
            </ListItem>
        </List>
      </Drawer>
      <main>
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