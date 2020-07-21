import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './_actions/user_action';

import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage';
import ProductPage from './components/views/ProductPage/ProductPage';
import Navbar from './components/views/NavBar/Navbar';
import Footer from './components/views/Footer/Footer';
import Dashboard from './components/views/dashboard/Dashboard';
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
	}
}));

const App = (props) => {
	const dispatch = useDispatch();
	const [ user, setUser ] = useState('');

	useEffect(() => {
		dispatch(auth()).then((response) => {
			setUser(response.payload);
		});
	}, []);

	const logoutHandler = () => {
		axios.get(`/api/users/logout`).then((response) => {
			if (response.data.success) {
				setUser('');
				// props.history.push('/login');
			} else {
				alert('logout fail');
			}
		});
	};
	const classes = useStyles();

	return (
		<Router>
			<div className={classes.root}>
				<Navbar user={user} onClickHandler={logoutHandler} />
				<main className={classes.content}>
					<div className={classes.appBarSpacer} />
					<Container maxWidth='lg' className={classes.container}>
						<Switch>
							<Route exact path='/' render={(props) => <LandingPage {...props} user={user} />} />
							<Route
								exact
								path='/login'
								render={(props) => <LoginPage {...props} user={user} setUser={setUser} />}
							/>
							<Route exact path='/register' render={(props) => <RegisterPage {...props} user={user} />} />
							<Route
								exact
								path='/product/upload'
								render={(props) => <UploadProductPage {...props} user={user} />}
							/>
							<Route exact path='/product/:id' render={(props) => <ProductPage {...props} user={user} />} />
							<Route exact path='/dashboard' render={(props) => <Dashboard {...props} user={user} />} />
						</Switch>
						<Box pt={4}>
							<Footer />
						</Box>
					</Container>
				</main>
			</div>
		</Router>
	);
};
export default App;
