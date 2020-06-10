import { api } from "../utils";
import { Folder } from "./Folder";

export class AssetVariant {
  assetVariantId?: number;
  url?: string;
  variantType?: { name: string }
}

export class Asset {
  assetId: number = 0;
  fileName?: string;
  displayName?: string;
  previewUrl?: string;
  metadata: { key: string, value: string }[] = [];
  assetVariants: AssetVariant[] = [];
}

export async function getAssets(folderId: number): Promise<Asset[]> {
  return await api<Folder>(`https://dc-demo-api.azurewebsites.net/api/Folder/${folderId || ''}`)
    .then(folder => folder.assets || []);
}

export async function getAssetDetails(assetId: number): Promise<Asset> {
  return await api<Asset>(`https://dc-demo-api.azurewebsites.net/api/Asset/${assetId}`);
}

export async function uploadAssets(files: any[], folderId: number) {
  for (let file of files) {
    const formData = new FormData();
    formData.append('file', file)
    await fetch(`https://dc-demo-api.azurewebsites.net/api/Asset?folderId=${folderId}`, {
      method: 'POST',
      body: formData
    });
  }
}