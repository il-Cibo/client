import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SearchBar } from 'react-native-elements'

function SearchBox() {
	const [search, setSearch] = useState('')
	return (
		<SearchBar
			placeholder="Search for recipes..."
			onChangeText={setSearch}
			value={search}
			lightTheme={true}
			round={true}
			containerStyle={{
				backgroundColor: '#FFF',
				borderColor: '#FFF',
			}}
			inputContainerStyle={{
				backgroundColor: '#f5f6fa',
				marginLeft: 25,
				marginRight: 25,
				height: 5
			}}
			inputStyle={{
				fontSize: 15
			}}
		/>
	)
}

export default SearchBox