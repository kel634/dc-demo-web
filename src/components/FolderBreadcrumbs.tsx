import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Link } from '@material-ui/core';
import { Folder } from '../models/Folder';

export default function FolderBreadcrumbs(props: { breadCrumbs: Folder[] }) {

  const onNavigate = (folder: Folder) => {
    console.log(folder);
  }

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {props.breadCrumbs.map((folder) => (
        <Link key={folder.folderId} color="inherit" href={`/${folder.folderId || ''}`} onClick={() => onNavigate(folder)}>
          {folder.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
}