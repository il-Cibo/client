import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SearchBox, RecipeSmallCard } from '../components'
import { SearchBar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_RECIPE } from '../config/queries';
import { useSelector } from 'react-redux';

function Search() {
  const token = useSelector(state => state.token);
  const [search, setSearch] = useState('');
  const { data, error } = useQuery(QUERY_SEARCH_RECIPE, {
    variables: {
      query: search
    },
    context: {
			headers: {
				token: token
			}
		}
  })
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Mealo</Text>
			</View>
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
			<ScrollView>
        { error && <Text>{JSON.stringify(error.message)}</Text>}
        { data && data.queryRecipes.map((recipe) => (
          <RecipeSmallCard onPress={recipe.id} key={recipe.id} recipe={recipe} />
        ))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
	},
	header: {
		height: '5%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		marginTop: 25,
		marginLeft: 25,
		marginRight: 25,
		paddingBottom: 35,
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'black',
		letterSpacing: 1
	}
});

export default Search