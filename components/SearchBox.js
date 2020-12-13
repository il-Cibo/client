import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SearchBar } from 'react-native-elements'

function SearchBox() {
	const [search, setSearch] = useState('')
	function updateSearch(input) {
		setSearch(input)
	}
	return (
		<SearchBar
			placeholder="Search for recipes..."
			onChangeText={(input) => updateSearch(input)}
			value={search}
			lightTheme={true}
			round={true}
			containerStyle={{
				backgroundColor: '#FFF',
				border: 'none',
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