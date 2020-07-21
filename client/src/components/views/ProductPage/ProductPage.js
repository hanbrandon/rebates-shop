import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto'
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column'
	},
	fixedHeight: {
		height: 240
	},
	icon: {
		marginRight: theme.spacing(2)
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6)
	},
	heroButtons: {
		marginTop: theme.spacing(4)
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8)
	},
	card: {
		height: '100%',
		display: 'flex',
		borderRadius: 0,
		flexDirection: 'column',
		textTransform: 'uppercase',
		boxShadow: 'unset',
		backgroundColor: 'unset'
	},
	discountRate: {
		fontSize: '11px',
		letterSpacing: '.2px',
		fontWeight: '400',
		lineHeight: '12px',
		textTransform: 'uppercase',
		border: '1px solid black',
		padding: '3px 2px 3px'
	},
	productName: {
		fontSize: '32px',
		color: 'black',
		letterSpacing: '.3px',
		fontStretch: 'condensed',
		fontWeight: '700',
		lineHeight: '36px',
		marginBottom: '4px',
		paddingBottom: '0',
		textTransform: 'uppercase'
	},
	cardMedia: {
		paddingTop: '56.25%' // 16:9
	},
	cardContent: {
		marginTop: '10px',
		flexGrow: 1,
		padding: 0,
		backgroundColor: 'unset'
	},
	cardActions: {
		padding: 0
	},
	originalPrice: {
		fontSize: '22px',
		letterSpacing: '.3px',
		lineHeight: '24px',
		textTransform: 'uppercase'
	},
	discountedPrice: {
		fontSize: '22px',
		color: 'red',
		letterSpacing: '.3px',
		lineHeight: '24px',
		textTransform: 'uppercase'
	},
	buyButton: {
		margin: theme.spacing(2, 0, 2),
		backgroundColor: 'black',
		borderRadius: '0',
		boxShadow: 'unset'
	},
	sellby: {
		marginTop: '10px'
	},
	stock: {
		marginTop: '6em'
	}
}));

const ProductPage = (props) => {
	const postId = props.match.params.id;

	const [ product, setProduct ] = useState([]);

	useEffect(() => {
		axios.get(`/api/product/getProduct/${postId}`).then((res) => {
			if (res.data.success) {
				setProduct(res.data.product);
				console.log(res.data.product);
			} else {
				alert('Failed to fetch product datas');
			}
		});
	}, []);

	const classes = useStyles();
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
				<Card className={classes.card}>
					<CardMedia
						className={classes.cardMedia}
						image={`http://localhost:5000/${product.images}`}
						title='Image title'
					/>{' '}
				</Card>
			</Grid>
			<Grid item xs={12} sm={6}>
				<CardContent className={classes.cardContent}>
					<h1 className={classes.productName}>{product.productName}</h1>
					<CardActions className={classes.cardActions}>
						<label className={classes.originalPrice}>
							<strike>{product.originalPrice} USD</strike>
						</label>
						<label className={classes.discountedPrice}>{product.discountedPrice} USD</label>
						<div className={classes.discountRate}>
							-{Math.round(product.discountedPrice / product.originalPrice * 100)}%
						</div>
					</CardActions>
					<div className={classes.sellby}>
						Sell by <Link to={'/'}>Username</Link>
					</div>
					<div className={classes.stock}>
						Only <strong>{product.totalQuantity - product.sold}</strong> more available today!
					</div>
					<Grid item lg={6}>
						<Link to={'/'}>
							<Button type='button' fullWidth variant='contained' color='primary' className={classes.buyButton}>
								BUY NOW
							</Button>
						</Link>
					</Grid>
				</CardContent>
			</Grid>
		</Grid>
	);
};
export default ProductPage;
