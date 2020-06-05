import { Folder } from "./Folder";

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