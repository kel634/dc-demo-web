import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Asset } from '../models/Asset';
import AssetDetails from './AssetDetails';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '100%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function AssetCard(props: { asset: Asset }) {
  const classes = useStyles();

  return (
    <Grid item key={props.asset.assetId} xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={props.asset.previewUrl}
          title={props.asset.displayName}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {props.asset.displayName}
          </Typography>
        </CardContent>
        <CardActions>
          <AssetDetails assetId={props.asset.assetId} />
        </CardActions>
      </Card>
    </Grid>
  );
}