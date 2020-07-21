import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import { buyerMenus, secondaryListItems } from '../components/listItems';
// import { DropzoneArea } from 'material-ui-dropzone';
import FileUpload from '../../utils/FileUpload';
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
	icon: {
		marginRight: theme.spacing(2)
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
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

// const Categories = [
//     {key: 1, value: }
// ]

const UploadProductPage = (props) => {
	const classes = useStyles();

	const [ Images, setImages ] = useState([]);

	const handleFieldChange = (e) => {
		const { name, value } = e.target;
		setFields({ ...fields, [name]: value });
	};

	const [ fields, setFields ] = useState({
		productName: '',
		amazonLink: '',
		originalPrice: '',
		discountedPrice: '',
		totalQuantity: '',
		quantityLimitPerDay: ''
	});

	const onSubmit = (e) => {
		e.preventDefault();

		// if (!TitleValue || !DescriptionValue || !PriceValue || !ContinentValue || !Images) {
		// 	return alert('fill all the fields first!');
		// }

		const variables = {
			writer: props.user._id,
			productName: fields.productName,
			amazonLink: fields.amazonLink,
			originalPrice: fields.originalPrice,
			discountedPrice: fields.discountedPrice,
			totalQuantity: fields.totalQuantity,
			quantityLimitPerDay: fields.quantityLimitPerDay,
			images: Images
		};

		axios.post('/api/product/uploadProduct', variables).then((response) => {
			if (response.data.success) {
				console.log(response.data.id);
				alert('Product Successfully Uploaded');
				props.history.push(`product/${response.data.id}`);
			} else {
				alert('Failed to upload Product');
			}
		});
	};

	const updateImages = (newImages) => {
		setImages(newImages);
	};
	return (
		<form noValidate onSubmit={onSubmit}>
			{console.log(props.user._id)}
			<Grid container spacing={2}>
				<FileUpload refreshFunction={updateImages} />
				<Grid item xs={12} sm={6}>
					<TextField
						name='productName'
						variant='outlined'
						required
						fullWidth
						id='productName'
						label='Product Name'
						autoFocus
						value={fields.productName}
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant='outlined'
						required
						fullWidth
						id='amazonLink'
						label='Amazon Link'
						name='amazonLink'
						type='url'
						value={fields.amazonLink}
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant='outlined'
						required
						fullWidth
						id='originalPrice'
						label='Original Price'
						name='originalPrice'
						value={fields.originalPrice}
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant='outlined'
						required
						fullWidth
						name='discountedPrice'
						label='Discounted Price'
						id='discountedPrice'
						value={fields.discountedPrice}
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant='outlined'
						required
						fullWidth
						name='totalQuantity'
						label='Total Quantity'
						type='number'
						id='totalQuantity'
						value={fields.totalQuantity}
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						variant='outlined'
						required
						fullWidth
						id='quantityLimitPerDay'
						label='Quantity Limit Per Day'
						name='quantityLimitPerDay'
						value={fields.quantityLimitPerDay}
						onChange={handleFieldChange}
					/>
				</Grid>
				<Grid item xs={12}>
					{/* <DropzoneArea
						onChange={handleFileChange}
						acceptedFiles={[ 'image/jpeg', 'image/png', 'image/bmp' ]}
						maxFileSize={5000000}
						filesLimit={1}
					/> */}
				</Grid>
			</Grid>
			<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
				Publish Product
			</Button>
		</form>
	);
};

export default UploadProductPage;
