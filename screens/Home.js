import React from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View } from 'react-native'
import { RecipeCard } from '../components'
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { GET_ALL_RECIPES } from '../config/queries'
import { Octicons } from '@expo/vector-icons'

function Home({ navigation }) {
	const { loading, error, data } = useQuery(GET_ALL_RECIPES, {
		context: {
			headers: {
				token: localStorage.getItem('token')
			}
		}
	})

	if (loading) {
		return <div>Loading..</div>
	}

	if (error) {
		return <div>{JSON.stringify(error)}</div>
	}

	function goToSearch() {
		navigation.navigate('Search')
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Mealo</Text>
				<Octicons name="search" size={24} color="black" onPress={goToSearch} />
			</View>
			<Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
			<ScrollView>
				{data.recipes.map((recipePost) => (
					<RecipeCard key={recipePost.id} recipe={recipePost} />
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

export default Home