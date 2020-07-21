import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	logo: {
		width: '150px',
		height: 'auto',
		marginBottom: '25px'
	}
}));

const RegisterPage = (props) => {
	const classes = useStyles();

	const dispatch = useDispatch();
	const [ Role, setRole ] = useState('');
	const [ Email, setEmail ] = useState('');
	const [ Name, setName ] = useState('');
	const [ Password, setPassword ] = useState('');
	const [ ConfirmPassword, setConfirmPassword ] = useState('');
	const [ Subscribe, setSubscribe ] = useState('false');

	const onEmailHandler = (e) => {
		setEmail(e.currentTarget.value);
	};

	const onNameHandler = (e) => {
		setName(e.currentTarget.value);
	};

	const onPasswordHandler = (e) => {
		setPassword(e.currentTarget.value);
	};

	const onConfirmPasswordHandler = (e) => {
		setConfirmPassword(e.currentTarget.value);
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();

		if (Password !== ConfirmPassword) {
			return alert('password and confirm password do not match');
		}
		let body = {
			email: Email,
			name: Name,
			password: Password,
			role: Role,
			subscribe: Subscribe
		};

		dispatch(registerUser(body)).then((response) => {
			if (response.payload.success) {
				props.history.push('/login');
			} else {
				alert('Failed to sign up');
			}
		});
	};
	const handleSubscribeChange = (e) => {
		if (Subscribe === true) {
			setSubscribe(false);
		} else {
			setSubscribe(true);
		}
	};

	const handleUserRole = (role) => {
		if (role === 'seller') {
			setRole('seller');
		} else if (role === 'buyer') {
			setRole('buyer');
		} else setRole('');
	};

	if (Role === '') {
		return (
			<Container
				component='main'
				maxWidth='xs'
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100vh'
				}}
			>
				<CssBaseline />
				<div className={classes.paper}>
					<Link to={'/'}>
						<img className={classes.logo} src='/asset/logo.png' alt='logo' />
					</Link>
					<Typography component='h1' variant='h5'>
						Do you want to SELL or BUY something?
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={() => {
									handleUserRole('seller');
								}}
							>
								SELLER
							</Button>
						</Grid>
						<Grid item xs={6}>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={() => {
									handleUserRole('buyer');
								}}
							>
								BUYER
							</Button>
						</Grid>
					</Grid>
					<Grid container justify='flex-end'>
						<Grid item>
							<Link to={'/signin'}>Already have an account? Sign in</Link>
						</Grid>
					</Grid>
				</div>
			</Container>
		);
	} else {
		console.log(Role);
		return (
			<Container
				component='main'
				maxWidth='xs'
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					height: '100vh'
				}}
			>
				<CssBaseline />
				<div className={classes.paper}>
					<Link to={'/'}>
						<img className={classes.logo} src='/asset/logo.png' alt='logo' />
					</Link>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>

					<form
						className={classes.form}
						noValidatestyle={{ display: 'flex', flexDirection: 'column' }}
						onSubmit={onSubmitHandler}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									autoComplete='name'
									name='Name'
									variant='outlined'
									required
									fullWidth
									id='fullName'
									label='Full Name'
									autoFocus
									value={Name}
									onChange={onNameHandler}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									value={Email}
									onChange={onEmailHandler}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									value={Password}
									onChange={onPasswordHandler}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant='outlined'
									required
									fullWidth
									name='confirmPassword'
									label='Confirm Password'
									type='password'
									id='confirmPassword'
									value={ConfirmPassword}
									onChange={onConfirmPasswordHandler}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											onChange={handleSubscribeChange}
											checked={Subscribe === true}
											name='subscribe'
											color='primary'
										/>
									}
									label='I want to receive inspiration, marketing promotions and updates via email.'
								/>
							</Grid>
						</Grid>
						<Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
							Sign Up
						</Button>
						<Grid container justify='flex-end'>
							<Grid item>
								<Link to={'/signin'}>Already have an account? Sign in</Link>
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		);
	}
};
export default RegisterPage;
