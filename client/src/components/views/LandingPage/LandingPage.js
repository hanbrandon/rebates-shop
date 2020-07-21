import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
		fontSize: '12px',
		letterSpacing: '.2px',
		fontWeight: '700',
		lineHeight: '15px',
		textTransform: 'uppercase'
	},
	productName: {
		fontSize: '12px',
		color: 'black',
		letterSpacing: '.2px',
		lineHeight: '15px',
		textTransform: 'uppercase',
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
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
		fontSize: '12px',
		letterSpacing: '.2px',
		lineHeight: '15px',
		textTransform: 'uppercase'
	},
	discountedPrice: {
		fontSize: '12px',
		color: 'red',
		letterSpacing: '.2px',
		lineHeight: '15px',
		textTransform: 'uppercase'
	}
}));

const LandingPage = (props) => {
	const [ Products, setProducts ] = useState([]);
	const [ Skip, setSkip ] = useState(0);
	const [ Limit, setLimit ] = useState(8);
	const [ PostSize, setPostSize ] = useState(0);

	useEffect(() => {
		const variables = {
			skip: Skip,
			limit: Limit
		};
		getProducts(variables);
	}, []);

	const getProducts = (variables) => {
		axios.post('/api/product/getProducts', variables).then((res) => {
			if (res.data.success) {
				setProducts([ ...Products, ...res.data.products ]);
				setPostSize(res.data.postSize);
				console.log(res.data.postSize);
			} else {
				alert('Failed to fetch product datas');
			}
		});
	};

	const onLoadMore = () => {
		let skip = Skip + Limit;

		const variables = {
			skip: skip,
			limit: Limit
		};
		getProducts(variables);
		setSkip(skip);
	};

	const classes = useStyles();

	if (!Products) {
		return <div />;
	} else {
		return (
			<Grid container spacing={2}>
				{/* Hero */}
				<Grid item xs={12} />
				{/* Products */}
				{Products.map((product, index) => (
					<Grid item key={index} xs={12} sm={6} md={3}>
						<Card className={classes.card}>
							<Link to={`/product/${product._id}`}>
								<CardMedia
									className={classes.cardMedia}
									image={`http://localhost:5000/${product.images[0]}`}
									title={product.productName}
								/>
							</Link>
							<CardContent className={classes.cardContent}>
								<div className={classes.discountRate}>
									{Math.round((product.originalPrice - product.discountedPrice) / product.originalPrice * 100)}%
									OFF
								</div>
								<Link to={'/hello'} className={classes.productName}>
									{product.productName}
								</Link>
							</CardContent>
							<CardActions className={classes.cardActions}>
								<label className={classes.originalPrice}>
									<strike>{product.originalPrice} USD</strike>
								</label>
								<label className={classes.discountedPrice}>{product.discountedPrice} USD</label>
							</CardActions>
						</Card>
					</Grid>
				))}
				{PostSize >= Limit && (
					<Button fullWidth variant='contained' color='primary' onClick={onLoadMore}>
						test
					</Button>
				)}
			</Grid>
		);
	}
};

export default LandingPage;
