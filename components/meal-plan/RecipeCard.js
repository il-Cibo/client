import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-elements'
import { SimpleLineIcons } from '@expo/vector-icons'
import {Picker} from '@react-native-picker/picker';

function RecipeCard({recipe}) {
	const [test, setTest] = useState({
		language: 'Java'
	})

	const goToRecipeDetails = () => {
		// navigation.navigate('DetailRecipe', {
		// 	recipeData: recipe,
		// })
	}
	

	const showModal = () => {
		return (
			<Picker
				// selectedValue={test}
				// style={{height: 50, width: 100}}
				// onValueChange={(itemValue, itemIndex) =>
				// 	setTest({language: itemValue})
				// }
				>
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="JavaScript" value="js" />
			</Picker>
		)
	}

	return (
		<TouchableOpacity onPress={goToRecipeDetails} >
			<Card containerStyle={{ borderRadius: 10, borderColor: '#dcdde1' }}>
				<View style={styles.cardHeader}>
					<View style={styles.userInfo}>
						<Text style={styles.recipeTitle}>{recipe.title}</Text>
					</View>
					<SimpleLineIcons name="options" size={20} color="black" onPress={showModal} />
				</View>
				<View style={styles.userInfo}>
				</View>
				<Text style={styles.recipeDescription}>
					{recipe.description}
				</Text>

			
			</Card>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	userPic: {
		width: 35,
		height: 35,
		borderRadius: 50
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		// justifyContent: 'space-around',
		width: 130,
		marginTop: -5,
		marginBottom: 5
	},
	favoriteButton: {
		marginTop: 5,
		marginLeft: 5
	},
	recipeTitle: {
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 12
	},
	recipeDescription: {
		marginTop: 5,
		fontSize: 10
	},
	cookInfo: {
		height: 60,
		marginTop: 5,
		justifyContent: 'space-evenly',
	},
	info: {
		color: "#747d8c",
		fontSize: 9,
		marginLeft: 5
	},
	row: {
		flexDirection: 'row',
		alignItems: 'baseline'
	}
})

export default RecipeCard 