import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton, Drawer, Divider, ListItem, ListItemText, List, Toolbar } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { DropzoneDialog, FileObject } from 'material-ui-dropzone';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FolderTree from './FolderTree';
import AssetCardList from './AssetCardList';
import { Route, useHistory } from 'react-router-dom';
import { Folder, buildRootFolder, loadFolders, getFoldersForBreadcrumbs } from '../models/Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';

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

  const [drawerOpen, drawerSetOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    drawerSetOpen(true);
  };
  const handleDrawerClose = () => {
    drawerSetOpen(false);
  };
  let history = useHistory();
  const getFolderId = (): number => {
    let m = history.location.pathname.match('/([0-9]+)');
    return m ? parseInt(m[1]) : 0;
  }
  const [currentFolderId, setCurrentFolderId] = React.useState<number>(getFolderId());

  const [rootFolder, setRootFolder] = React.useState<Folder>(buildRootFolder([]));
  const [folderBreadcrumbs, setFolderBreadcrumbs] = React.useState<Folder[]>([rootFolder]);

  const handleFolderNavigate = (folderId: number) => {
    history.push(`/${folderId.toString()}`);
    setCurrentFolderId(folderId);
    setFolderBreadcrumbs(getFoldersForBreadcrumbs(rootFolder, folderId));
  }

  useEffect(() => {
    const fetchData = async () => {
      const rf = await loadFolders();
      setRootFolder(rf);
      setFolderBreadcrumbs(getFoldersForBreadcrumbs(rf, currentFolderId));
    };
 
    fetchData();
  }, []);

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
            <FolderBreadcrumbs breadCrumbs={folderBreadcrumbs} />
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
        <FolderTree rootFolder={rootFolder}  onFolderNavigate={handleFolderNavigate} />
        
      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
        <Container className={classes.cardGrid} maxWidth="md">
          <Route component={AssetCardList} />;
        </Container>
      </main>
    </div>
  );
}