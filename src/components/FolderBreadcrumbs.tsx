import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Link } from '@material-ui/core';
import { Folder } from '../models/Folder';

export default function FolderBreadcrumbs(props: { breadCrumbs: Folder[], onFolderNavigate: (folderId: number) => void }) {

  const onNavigate = (folder: Folder) => {
    props.onFolderNavigate(folder.folderId);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {props.breadCrumbs.map((folder) => (
        <Link key={folder.folderId} color="inherit" onClick={() => onNavigate(folder)}>
          {folder.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
}