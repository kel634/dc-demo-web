import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AssetCard from './AssetCard';
import { Asset, getAssets } from '../models/Asset';


export default function AssetCardList(props: { folderId: number, newFileCount: number }) {
  let [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const assetsList = await getAssets(props.folderId);
      setAssets(assetsList);
    };

    fetchData();
  }, [props]);

  return (
    <Grid container spacing={4}>
      {assets.map((asset) => (
        <AssetCard key={asset.assetId} asset={asset} />
      ))}
    </Grid>
  );
}