import React, { useState, useEffect } from 'react'
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { FavoriteCard, Loading } from '../components'
import { LIST_FAV_USER_RECIPE } from '../config/queries'
import { useQuery } from '@apollo/client'
import Constants from 'expo-constants'
import { tokenVar } from '../store/makeVar'

function Favorite({ navigation }) {
	const { loading, error, data, refetch } = useQuery(LIST_FAV_USER_RECIPE)

	if (error) {
		return (
			<View style={styles.container}>
				<Text>{error.message}</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={styles.headerText}>Your Favorites</Text>
				</View>
			</View>
			<Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
			<ScrollView style={styles.content}>
				{
					!data? <Loading/> : 
					data?.findFav?.Recipes.map((recipePost, i) => (
						<FavoriteCard key={i} username={data.findFav.username} userId={data.findFav.id} recipe={recipePost} fetch={refetch}/>
					))
				}
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
		paddingBottom: 35,
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: 'black',
		letterSpacing: 1,
		fontFamily: 'Oswald',
	},
	content: {
		marginBottom: 20,
		marginTop: 20
	}
});

export default Favorite