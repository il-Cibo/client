import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { RecipeCard } from '../components'

function Favorite() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View>
					<Text style={styles.headerText}>Username's Favorites</Text>
				</View>
			</View>
			<Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
			<ScrollView style={styles.content}>
				<RecipeCard />
				<RecipeCard />
				<RecipeCard />
				<RecipeCard />
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