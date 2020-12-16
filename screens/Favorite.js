import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { FavoriteCard } from '../components'
import { LIST_FAV_USER_RECIPE } from '../config/queries'
import { useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants'

function Favorite() {
	// const UserId = data?.user?.id
	const [userFavo, setUserFavo] = useState([])
	const token = useSelector((state) => state.token)
	const { loading, error, data } = useQuery(LIST_FAV_USER_RECIPE, {
		context: {
			headers: {
				token: token
			}
		}
	})

	useEffect(() => {
		if (data) {
			const allUserFav = data.findFav.Recipes.filter((el) => el.UserRecipe.favorites)
			setUserFavo(allUserFav);
		}
	}, [data])

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
					<Text style={styles.headerText}>{data.findFav.username}'s Favorites</Text>
				</View>
			</View>
			<Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
			<ScrollView style={styles.content}>
				{userFavo.map((recipePost, i) => (
					<FavoriteCard key={i} username={data.findFav.username} userId={data.findFav.id} recipe={recipePost} />
				))}
				{/* <Text>{JSON.stringify(data)}</Text> */}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
		justifyContent: 'flex-start',
		marginTop: Constants.statusBarHeight
	},
	header: {
		width: '100%',
		height: '5%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 25,
		marginLeft: 25,
		paddingBottom: 35
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: 'black',
		letterSpacing: 1
	},
	content: {
		marginBottom: 20,
		marginTop: 20
	}
});

export default Favorite