import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { RecipeCard } from '../components'

function Home() {
	return (
		<View style={styles.container}>
			{/* <Text>Home Feed</Text> */}
			{/* <Ionicons name="home-outline" size={20} color='pink' /> */}
				<RecipeCard />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default Home