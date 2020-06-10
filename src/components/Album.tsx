import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { IconButton, Drawer, Divider, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FolderTree from './FolderTree';
import AssetCardList from './AssetCardList';
import { useHistory } from 'react-router-dom';
import { Folder, buildRootFolder, loadFolders, getFoldersForBreadcrumbs } from '../models/Folder';
import FolderBreadcrumbs from './FolderBreadcrumbs';
import UploadAsset from './UploadAsset';
import CreateFolder from './CreateFolder';
import DeleteFolder from './DeleteFolder';

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
  toolbarbuttons: {
    display: 'flex'
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
  const [newFileCount, setNewFileCount] = React.useState<number>(0);

  const handleFolderNavigate = (folderId: number) => {
    history.push(`/${folderId.toString()}`);
    setCurrentFolderId(folderId);
    setFolderBreadcrumbs(getFoldersForBreadcrumbs(rootFolder, folderId));
  }

  const handleFolderCreate = (folderId: number) => {
    handleFolderNavigate(folderId);
  }

  const handleFolderDelete = (folderId: number) => {
    const parentFolderIdx = folderBreadcrumbs.length > 2 ? folderBreadcrumbs.length - 2 : 0;
    const parentFolderId = folderBreadcrumbs[parentFolderIdx].folderId;
    handleFolderNavigate(parentFolderId);
  }

  const handleUploadAssets = () => {
    setNewFileCount(newFileCount + 1);
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
            className={clsx(classes.drawerMenuButton, drawerOpen && classes.drawerHide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            <FolderBreadcrumbs breadCrumbs={folderBreadcrumbs} onFolderNavigate={handleFolderNavigate} />
          </Typography>
          <div className={classes.toolbarbuttons}>
            <DeleteFolder parentId={currentFolderId} onFolderDelete={handleFolderDelete} />
            <CreateFolder parentId={currentFolderId} onFolderCreate={handleFolderCreate} />
            <UploadAsset folderId={currentFolderId} onUploadAssets={handleUploadAssets} />
          </div>
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
        <FolderTree rootFolder={rootFolder} onFolderNavigate={handleFolderNavigate} />

      </Drawer>
      <main className={clsx(classes.content, { [classes.contentShift]: drawerOpen })}>
        <Container className={classes.cardGrid} maxWidth="md">
          {!currentFolderId && (
            <Typography variant="h4" color="inherit" noWrap>
              Select a folder from the sidebar, or add a new folder.
            </Typography>
          )}
          <AssetCardList folderId={currentFolderId} newFileCount={newFileCount} />
        </Container>
      </main>
    </div>
  );
}