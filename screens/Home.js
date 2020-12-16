import React, { useEffect, useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import { GET_ALL_RECIPES, GET_PROFILE } from '../config/queries'
import { useSelector, useDispatch } from 'react-redux'
import { RecipeCard, Loading } from '../components'
import Constants from 'expo-constants'
import { Octicons } from '@expo/vector-icons'

const wait = timeout => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

function Home({ navigation }) {
	const token = useSelector((state) => state.token)
	const dispatch = useDispatch()
	const { loading, error, data, refetch } = useQuery(GET_ALL_RECIPES, {
		context: {
			headers: {
				token: token
			}
		}
	})

	const [getUser] = useLazyQuery(GET_PROFILE, {
    context: {
      headers: {
        token: token
      }
		},
		onCompleted: ((dataUser) => {
			dispatch({
				type: 'SET_USER',
				payload: dataUser.user
			})
		})
  })
	
	useEffect(() => {
		getUser()
		
		refetch()
	}, [])

	const [refreshing, setRefreshing] = React.useState(false);

	const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		refetch()
		wait(500).then(() => setRefreshing(false));
	}, []);

	function goToSearch() {
		navigation.navigate('Search')
	}

	if (loading) {
		return (
			<Loading />
		)
	}

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
				<Text style={styles.headerText}>Mealo</Text>
				<Octicons name="search" size={24} color="black" onPress={goToSearch} />
			</View>
			<Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
			<ScrollView
				refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
				title="Please wait, refreshing.."
			>
				{data.recipes.map((recipePost) => (
					<RecipeCard key={recipePost.id} recipe={recipePost} user={data.user} navigation={navigation} />
				))}
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginTop: Constants.statusBarHeight
	},
	header: {
		height: '8%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 35,
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