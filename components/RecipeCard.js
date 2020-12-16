import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card, BottomSheet, ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import { ADD_TO_FAVORITE_RECIPE, DELETE_RECIPE_FAV, LIST_FAV_USER_RECIPE } from '../config/queries'
import { useMutation, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import ButtonUnLike from './ButtonUnLike';

function RecipeCard({ navigation, recipe, user }) {

	const [like, setLike] = useState(false)
	const token = useSelector((state) => state.token)
	const [isVisible, setIsVisible] = useState(false)
	const list = [
		{
			title: 'Edit Recipe',
			containerStyle: {
				backgroundColor: '#FFF',
			},
			titleStyle: {
				color: 'black',
				marginLeft: 30,
			},
			onPress: () => {
				setIsVisible(false)
				navigation.navigate('EditRecipe')
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
			onPress: () => setIsVisible(false)
		}
	]

	function goToRecipeDetail() {
		navigation.navigate('DetailRecipe', {
			recipeId: recipe.id
		})
	}

	const [newFavRecipe] = useMutation(ADD_TO_FAVORITE_RECIPE, {
		context: {
			headers: {
				token: token
			}
		}
	})



	const onsubmit = () => {

		console.log("LIKE DULUU");
		setLike(true)
		newFavRecipe({
			variables: {
				id: recipe.id,
				UserRecipe: {
					UserId: user,
					RecipeId: recipe.id,
					favorites: true,
					plan: []
				}
			}
		})
	}


	const { loading, error, data } = useQuery(LIST_FAV_USER_RECIPE, {
		context: {
			headers: {
				token: token
			}
		}
	})

	useEffect(() => {
		// if (data) {
		// 	const allUserFav = data.findFav.Recipes.map((el) => el.UserRecipe.favorites === true ? true : false)
		// 	console.log({allUserFav});
		// 	setLike(allUserFav);
		// }
		if (data) {
			const allUserFav = data.findFav.Recipes.filter((el) => el.id === recipe.id)
			console.log({ allUserFav });
			setLike(allUserFav[0]?.UserRecipe?.favorites);
		}
	}, [data])

	// console.log(data?.findFav?.Recipes[0]?.UserRecipe, "======================= list recipe dan userid dari home ==============")
	// console.log(like);
	// console.log({ recipe });

	return (
		<Card containerStyle={{ borderRadius: 10, borderColor: '#dcdde1' }}>
			<View style={styles.cardHeader}>
				<View style={styles.userInfo}>
					<Image
						style={styles.userPic}
						source={require('../assets/woman.svg')}
					/>
					<Text style={styles.usernameStyle}>username</Text>
				</View>
				<MaterialIcons onPress={() => setIsVisible(true)} name="keyboard-arrow-down" size={24} color="black" />
			</View>
			<Card.Image
				onPress={goToRecipeDetail}
				source={{ uri: recipe.image }} />

			{!like && <MaterialIcons onPress={onsubmit} name="favorite" size={24} color="black" style={styles.favoriteButton} />}
			{like && <ButtonUnLike setLike={setLike} recipeId={recipe.id} />}

			<Text style={styles.recipeTitle}>{recipe.title}</Text>
			<Text style={styles.recipeDescription}>
				{recipe.description}
			</Text>
			<View style={styles.cookInfo}>
				<View style={styles.row}>
					<MaterialCommunityIcons name="bowl-mix-outline" size={16} color="#747d8c" />
					<Text style={styles.info}>Serving: {recipe.serving}</Text>
				</View>
				<View style={styles.row}>
					<Ionicons name="timer-outline" size={16} color="#747d8c" />
					<Text style={styles.info}>Time Cook: {recipe.time} mins</Text>
				</View>
				<View style={styles.row}>
					<AntDesign name="tago" size={16} color="#747d8c" />
					<Text style={styles.info}>Tags: chicken</Text>
				</View>
			</View>
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
		alignItems: 'flex-start',
	},
	userPic: {
		width: 30,
		height: 30,
		borderRadius: 50
	},
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: 90,
		marginTop: -5,
		marginBottom: 5,
		marginLeft: 10
	},
	usernameStyle: {
		fontSize: 12
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