import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Folder } from '../models/Folder';
import { tempData } from '../models/TempData';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function FolderTree(props: any) {
  const classes = useStyles();
  let history = useHistory();

  const showFolderAssets = (folder: Folder) => {
    history.push(`/${folder.id || ''}`);
  }

  const renderTree = (folder: Folder) => (
    <TreeItem key={folder.id} nodeId={folder.id?.toString() || 'root'} label={folder.name} onClick={() => showFolderAssets(folder)}>
      {Array.isArray(folder.subFolders) ? folder.subFolders.map((node: any) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree(tempData)}
    </TreeView>
  );
}