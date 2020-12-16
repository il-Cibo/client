import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, BottomSheet, ListItem } from 'react-native-elements'
import { SimpleLineIcons } from '@expo/vector-icons'
import { REMOVE_FROM_PLAN, GET_MEALPLAN } from '../../config/queries'
import { useMutation } from '@apollo/client'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tokenVar } from '../../store/makeVar'

function RecipeCard({ recipe, currentDate, refetch }) {
	const [isVisible, setIsVisible] = useState(false)

	const [removeFromPlan, { loading, error, data }] = useMutation(REMOVE_FROM_PLAN, {
    context: {
      headers: {
        token: tokenVar()
      }
		},
		onCompleted: () => refetch()
  })
	
	const list = [
		{
			title: 'Remove From Your Meal Plan',
			containerStyle: {
				backgroundColor: '#FFF',
			},
			titleStyle: {
				color: 'black',
				marginLeft: 30,
			},
			onPress: () => {
				removeFromPlan({
					variables: {
						id: recipe.id,
						plan: currentDate
					}
				})
				setIsVisible(false)
			}
		},
		{
			title: 'Cancel',
			containerStyle: {
				backgroundColor: '#FFF'
			},
			titleStyle: {
				color: 'black',
				marginLeft: 30,
			},
			onPress: () => {
				setIsVisible(false)
			}
		}
	]

	function goToRecipeDetail() {
		navigation.navigate('DetailRecipe', {
			recipeData: recipe,
			user: user,
			recipeId: recipe.id,
		})
	}
	
	return (
		<Card containerStyle={{ borderRadius: 10, borderColor: '#dcdde1' }}>
			<View style={styles.cardHeader}>
				<View>
					<TouchableOpacity onPress={goToRecipeDetail} >
						<Text style={styles.recipeTitle}>{recipe.title}</Text>
					</TouchableOpacity>
				</View>
				<View>
					<SimpleLineIcons name="options" size={20} color="black" onPress={() => setIsVisible(true)}/>
				</View>
			</View>
			<View style={styles.userInfo}>
			</View>
			<Text style={styles.recipeDescription}>
				{recipe.description}
			</Text>
	
			<BottomSheet
				transparent={true}
				isVisible={isVisible}>
				{list.map((l, i) => (
					<ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
						<ListItem.Content>
							<ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
						</ListItem.Content>
					</ListItem>
				))}
			</BottomSheet>
		</Card>
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
		// alignItems: 'flex-start',
	},
	userPic: {
		width: 30,
		height: 30,
		borderRadius: 50
	},
	recipeTitle: {
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 16,
		fontFamily: 'Oswald',
	},
	recipeDescription: {
		marginTop: 5,
		fontSize: 12,
		fontFamily: 'Oswald',
		letterSpacing: 1
	},
	cookInfo: {
		height: 60,
		marginTop: 5,
		justifyContent: 'space-evenly',
	},
	info: {
		color: "#747d8c",
		fontSize: 9,
		marginLeft: 5,
		fontFamily: 'Oswald',
		letterSpacing: 1
	},
	row: {
		flexDirection: 'row',
		alignItems: 'baseline'
	}
})

export default RecipeCard