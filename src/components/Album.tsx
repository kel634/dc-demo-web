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
import FolderTree from './FolderTree';
import AssetCardList from './AssetCardList';
import { Route, Router } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Album() {
  const classes = useStyles();
  const [dialogOpen, dialogSetOpen] = React.useState(false);
  let uploadedFiles: FileObject[] = [];

  const [drawerOpen, drawerSetOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    drawerSetOpen(true);
  };
  const handleDrawerClose = () => {
    drawerSetOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: drawerOpen })}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.drawerMenuButton, drawerOpen && classes.drawerHide)}
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
        <FolderTree />
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Route component={AssetCardList} />;
        </Container>
      </main>
    </div>
  );
}