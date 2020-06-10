import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Chip, Paper, Tabs, Tab } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { getAssetDetails, Asset } from '../models/Asset';
import TabPanel from './TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  tag: {
    margin: '2px'
  },
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AssetDetails(props: { assetId: number }) {
  const classes = useStyles();
  const [dialogOpen, dialogSetOpen] = React.useState(false);
  const [asset, setAsset] = React.useState<Asset>();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleOpen = async () => {
    dialogSetOpen(true);
    setAsset(await getAssetDetails(props.assetId));
  };

  const handleClose = () => {
    dialogSetOpen(false);
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        Details
      </Button>
      <Dialog fullScreen open={dialogOpen} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Asset details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div>
            <Typography variant="h6">
              Tags:
            </Typography>
            {asset?.metadata.map((md) => (
              <Chip className={classes.tag} key={md.key} color="primary" label={md.value} />
            ))}
            <Typography variant="h6">
              Variants:
            </Typography>
            <Paper className={classes.root}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                {asset?.assetVariants.map((av) => (
                  <Tab key={av.assetVariantId} label={av.variantType?.name}/>
                ))}
              </Tabs>
              {asset?.assetVariants.map((av, idx) => (
                <TabPanel key={idx} value={tabValue} index={idx}>
                  <img src={av.url} alt={asset.displayName} />
                </TabPanel>
              ))}
            </Paper>
          </div>
        </div>
      </Dialog>
    </div>
  );
}