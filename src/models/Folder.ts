import { Asset } from "./Asset";

export class Folder {
  id?: number = 0;
  name: string = "[New Folder]";
  parentId?: number | null = null;
  subFolders?: Folder[] = [];
  assetCount?: number = 0;
  assets?: Asset[] = [];
}