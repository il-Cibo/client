import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { RecipeCard } from '../components'
import { LIST_FAV_USER_RECIPE } from '../config/queries'
import { useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

function Favorite() {
	const UserId = data?.user?.id
	const token = useSelector((state) => state.token)
	const { loading, error, data } = useQuery(LIST_FAV_USER_RECIPE, {
		variables: {
			UserId
		},
		context: {
			headers: {
				token: token
			}
		}
	})

	if (loading) {
		return <Text>Loading ...</Text>
	}

	if (error) {
		return (
			<View style={styles.container}>
				<Text>{JSON.stringify(error.message)}</Text>
			</View>
		)
	}
	console.log(data, '<<< data favorite')

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={styles.headerText}>Username's Favorites</Text>
				</View>
			</View>
			<Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
			<ScrollView style={styles.content}>
				{/* {data.recipes.map((recipePost) => (
					<RecipeCard key={recipePost.id} recipe={recipePost} />
				))} */}
				<Text>{JSON.stringify(data)}</Text>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		justifyContent: 'flex-start',
	},
	header: {
		width: '100%',
		height: '5%',
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 25,
		marginLeft: 25,
		paddingBottom: 35
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'black',
		letterSpacing: 1
	},
	content: {
		marginBottom: 20,
		marginTop: 20
	}
});

export default Favorite