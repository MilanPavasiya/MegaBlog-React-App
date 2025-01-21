import './App.css';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authslice';
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((e) => console.log('Error :: App-useEffect', e))
			.finally(() => setLoading(false));
	}, []);

	return !loading ? (
		<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
			<div className='w-full block'></div>
			<Header />
			<main>
				TODO: <outlet />
			</main>
			<Footer />
		</div>
	) : null;
}

export default App;
