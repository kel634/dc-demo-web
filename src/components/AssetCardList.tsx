import React from 'react';
import Grid from '@material-ui/core/Grid';
import AssetCard from './AssetCard';
import { Asset } from '../models/Asset';


export default function AssetCardList(props: { assets: Asset[] }) {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <Grid container spacing={4}>
      {props.assets.map((asset) => (
        <AssetCard asset={asset} />
      ))}
    </Grid>
  );
}