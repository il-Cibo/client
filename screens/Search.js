import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SearchBox, RecipeSmallCard } from '../components'
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

function Search() {
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Mealo</Text>
			</View>
			<SearchBox
			/>
			<ScrollView>
				<RecipeSmallCard />
				<RecipeSmallCard />
				<RecipeSmallCard />
				<RecipeSmallCard />
				<RecipeSmallCard />
				<RecipeSmallCard />
				<RecipeSmallCard />
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