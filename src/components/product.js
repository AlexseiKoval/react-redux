import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SaveIcon from '@material-ui/icons/Save';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function ProductItem(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [itemtitle, setItemtitle] = React.useState(props.product.title);
    const [isEditTexts, setEditText] = React.useState('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onChatgeText = (event) => {
        setEditText('EDIT . . . ')
        setItemtitle(event.target.value)
    }

    const onUpdateProduct = (event) => {
        setEditText('SAVED')
        props.updateProduct({ id: props.product.id, title: itemtitle })
    }

    const onExsitProduct = (event) => {
        props.exsitProduct()
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Edit :
          </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>

                    <ListItem button onClick={onUpdateProduct}>
                        <ListItemIcon>  <SaveIcon />  </ListItemIcon>
                        <ListItemText primary={'Save'} />
                    </ListItem>
                    <ListItem button onClick={onExsitProduct} >
                        <ListItemIcon>  <ExitToAppIcon />  </ListItemIcon>
                        <ListItemText primary={'Exit'} />
                    </ListItem>

                </List>
                <Divider />

            </Drawer>
            <main className={classes.content}>

                <TextField
                    id="standard-multiline-static"
                    variant="outlined"
                    label={isEditTexts}
                    multiline
                    rows={30}
                    fullWidth
                    defaultValue={itemtitle}
                    onChange={onChatgeText}
                />
            </main>
        </div>
    );
}

class Product extends React.Component {
    constructor(props) {
        super(props);
    }

    exsitProduct = () => {
        this.props.history.push('');
    }

    render() {
        return (
            <div>
                <ProductItem product={this.props.products.find(row => row.id.toString() === this.props.match.params.id) || { id: '', title: '' }}
                    updateProduct={this.props.updateProduct}
                    exsitProduct={this.exsitProduct}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        products: state.products
    }),
    dispath => ({
        updateProduct: (product) => { dispath({ type: 'updateproduct', product: product }) }
    }
    )
)(Product)