import React from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View } from 'react-native'
import { RecipeCard } from '../components'
import { Divider, Header } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
// import { GET_ALL_RECIPES } from '../config/queries'

function Home() {
	// const { loading, error, data } =useQuery(GET_ALL_RECIPES)

	// if (loading) {
	// 	return <div>Loading..</div>
	// }

	// if (error) {
	// 	return <div>{error.message}</div>
	// }

	return (
		<View style={styles.container}>
			<Header
				leftComponent={{ text: 'Mealo', style: { color: 'black', fontSize: 22, width: 150, marginLeft: 15, marginTop: 10, fontWeight: 'bold', paddingBottom: 30, paddingTop: 20 } }}
				backgroundColor= '#FFF'
			/>
			<Divider style={{ backgroundColor: '#f5f6fa' }} />
			<ScrollView>
				{/* {data.recipes.map((recipePost) => (
					<RecipeCard key={recipePost.id} recipe={recipePost} />
				))} */}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		justifyContent: 'flex-start',
	}
});

export default Home