import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'
import { RecipeCard, Loading } from '../components'
import { Divider } from 'react-native-elements'
import { GET_ALL_RECIPES } from '../config/queries'
import { useSelector } from 'react-redux'
import Constants from 'expo-constants'
import { Octicons } from '@expo/vector-icons'

const wait = timeout => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

function Home({ navigation }) {
	const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbWFuZGFqZWhhbiIsImlhdCI6MTYwODAwNDM3NX0.e6SvCZB9cfxBGjpnrEwHIdiNcDNONp3YEo_ZLltC7JQ"
	// const token = useSelector((state) => state.token)
	const { loading, error, data, refetch } = useQuery(GET_ALL_RECIPES, {
		context: {
			headers: {
				token: token
			}
		}
	})
	useEffect(() => {
		refetch()
	}, [data])

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		wait(500).then(() => setRefreshing(false));
	}, []);


	if (loading) {
		return <Loading />
	}

	if (error) {
		return (
			<View style={styles.container}>
				<Text>{JSON.stringify(error.message)}asdadasd</Text>
			</View>
		)
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
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				title="Please wait, refreshing.."
			>
				{data.recipes.map((recipePost) => (
					<RecipeCard key={recipePost.id} recipe={recipePost} navigation={navigation} />
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	header: {
		height: '8%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 25,
		paddingLeft: 25,
		paddingRight: 25,
		paddingBottom: 35,
	},
	headerText: {
		fontWeight: 'bold',
		fontSize: 26,
		color: 'black',
		letterSpacing: 1,
		fontFamily: 'Oswald',
	}
});

export default Home