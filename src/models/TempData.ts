import { Folder } from "./Folder";
import { Asset } from "./Asset";

export const tempData: Folder = {
  name: "My Assets",
  subFolders: [
    {
      id: 1,
      name: "root 1",
    },
    {
      id: 2,
      name: "root 2",
      assetCount: 2,
      assets: [
        {
          id: 1,
          displayName: "a1.jpg",
          fileName: "a1-test.jpg",
          previewUrl: "https://source.unsplash.com/random",
        },
        {
          id: 2,
          displayName: "a2.jpg",
          fileName: "a2-test.jpg",
          previewUrl: "https://source.unsplash.com/random",
        },
      ],
    },
    {
      id: 3,
      name: "root 3",
      subFolders: [
        {
          id: 4,
          name: "sub 1",
          subFolders: [
            {
              id: 6,
              name: "sub sub 1",
              subFolders: [],
            },
            {
              id: 7,
              name: "sub sub 2",
            },
          ],
        },
        {
          id: 5,
          name: "sub 2",
        },
      ],
    },
  ]
}

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