import { Asset } from "./Asset";
import { api } from "../utils";

export class Folder {
  folderId: number = 0;
  name: string = "[New Folder]";
  parentId?: number | null = null;
  subFolders: Folder[] = [];
  assetCount?: number = 0;
  assets?: Asset[] = [];
}

export async function loadFolders(): Promise<Folder> {
  return await api<Folder[]>("https://dc-demo-api.azurewebsites.net/api/Folder")
    .then(buildRootFolder);
}

export function getFoldersForBreadcrumbs(current: Folder, selectedFolderID: number): Folder[] {
  let bc: Folder[] = [];
  // if we reached the child, return the folder
  if (current?.folderId === selectedFolderID)
    bc.push(current);

  // search the current folder's children
  for (let sf of current?.subFolders || []) {
    let sfBreadcrumbs = getFoldersForBreadcrumbs(sf, selectedFolderID);
    // if the recursive
    if (sfBreadcrumbs.length)
      bc.push(current, ...sfBreadcrumbs);
  }

  return bc;
}

export function buildRootFolder(subFolders: Folder[]): Folder {
  return {
    folderId: 0,
    name: "My Assets",
    subFolders: subFolders
  };
}