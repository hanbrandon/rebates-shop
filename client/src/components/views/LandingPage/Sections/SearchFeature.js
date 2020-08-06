import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const SearchFeature = (props) => {
	const [ SearchTerms, setSearchTerms ] = useState('');
	const onChangeSearch = (e) => {
		setSearchTerms(e.currentTarget.value);
		props.refreshFunction(e.currentTarget.value);
	};
	return (
		<TextField
			variant='outlined'
			margin='normal'
			required
			fullWidth
			id='search'
			label='Search...'
			name='search'
			autoFocus
			onChange={onChangeSearch}
			value={SearchTerms}
		/>
	);
};

export default SearchFeature;
