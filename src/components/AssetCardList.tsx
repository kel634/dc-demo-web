import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AssetCard from './AssetCard';
import { Asset } from '../models/Asset';
import { useHistory } from 'react-router-dom';
import { getRandomAssets } from '../models/TempData';


export default function AssetCardList(props: any) {
  let history = useHistory();
  const getFolderId = () => {
    let m = history.location.pathname.match('/([0-9]+)');
    return m ? parseInt(m[1]) : 0;
  }
  let [currentFolderId, setCurrentFolderId] = useState(getFolderId());
  let [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    setCurrentFolderId(getFolderId());
  }, [props]);

  useEffect(() => {
    getRandomAssets(currentFolderId).then(data => {
      setAssets(data);
    });
  }, [currentFolderId]);

  return (
    <Grid container spacing={4}>
      {assets.map((asset) => (
        <AssetCard key={asset.id} asset={asset} />
      ))}
    </Grid>
  );
}