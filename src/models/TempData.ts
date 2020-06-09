import { Asset } from "./Asset";

export const getRandomAssets = async (folderId: number): Promise<Asset[]> => {
  let assets: Asset[] = [];
  const data = await fetch('https://api.imgflip.com/get_memes');
  const items = await data.json();

  if (items.success) {
    assets = items.data.memes.map((m: { id: any; name: any; url: any; }) => <Asset>{
      id: m.id,
      displayName: m.name,
      previewUrl: m.url,
      fileName: m.url,
    });

    shuffleArray(assets);
    assets = assets.splice(0, folderId);
  }

  return assets;
}


function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}