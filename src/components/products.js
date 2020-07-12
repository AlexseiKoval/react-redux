import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle';

import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
}));


function ProductsItem(props) {
  const classes = useStyles();
  return (

    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to={`/Product/${props.product.id}`}> {!props.isNew ? (<EditIcon />) : (<AddCircle />)}</Link>
          </IconButton>
        </Grid>
        <Grid item xs>
          <Typography><Link to={`/Product/${props.product.id}`}>{props.product.title}</Link></Typography>
        </Grid>
      </Grid>
    </Paper>

  );
}


class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div >
        {this.props.products.filter(row=>row.title.indexOf(this.props.search) != -1).map((row, index) => <ProductsItem key={index} product={row} isNew={false} />)}
        <ProductsItem product={{ id: '', title: ' NEW ' }} isNew={true} />
      </div>
    );
  }
}

export default connect(
  state => ({
    products: state.products,
    search: state.search
  })
)(Products)