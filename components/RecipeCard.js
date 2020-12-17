import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card, BottomSheet, ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import { ADD_TO_FAVORITE_RECIPE, LIST_FAV_USER_RECIPE } from '../config/queries'
import { useMutation, useQuery } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import ButtonUnLike from './ButtonUnLike';
import Tags from "react-native-tags";
import { ModalAddPlan } from './'
import { tokenVar } from '../store/makeVar'

function RecipeCard({ navigation, recipe }) {
	const [like, setLike] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const closeModal = () => {
		setShowModal(false)
	}

	const openModal = () => {
		setShowModal(true)
	}

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
				navigation.navigate('EditRecipe', {
					recipeId: recipe.id
				})
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
			page: 'home'
		})
	}
	
	const [newFavRecipe] = useMutation(ADD_TO_FAVORITE_RECIPE, {
		refetchQueries: {
			query: LIST_FAV_USER_RECIPE
		}
	})

	const addToFav = () => {
		setLike(true)
		newFavRecipe({
			variables: {
				id: +recipe.id,
			}
		})
	}

	const { loading, error, data } = useQuery(LIST_FAV_USER_RECIPE)

	useEffect(() => {

		if (data) {
			const allUserFav = data.findFav.Recipes.filter((el) => el.id === recipe.id)
			setLike(allUserFav[0]?.UserRecipe?.favorites);
		}
	}, [data])

	return (
		<Card containerStyle={{ borderRadius: 10, borderColor: '#dcdde1' }}>
			<View style={styles.cardHeader}>
				<View style={styles.userInfo}>
					<Image
						style={styles.userPic}
						source={require('../assets/woman.svg')}
					/>
					<Text style={styles.usernameStyle}>{recipe.Users.map((user) => user.username)}</Text>
				</View>
				<MaterialIcons onPress={() => setIsVisible(true)} name="keyboard-arrow-down" size={24} color="black" />
			</View>
			<Card.Image
				onPress={goToRecipeDetail}
				source={{ uri: recipe.image }} />
			
			<View style={{
				flexDirection: 'row',
				paddingTop: 10
			}}>
				{!like && <MaterialIcons onPress={addToFav} name="favorite-outline" size={24} color="black" style={styles.favoriteButton} />}
				{like && <ButtonUnLike setLike={setLike} recipeId={recipe.id}  style={styles.favoriteButton}/>}
				<MaterialCommunityIcons onPress={openModal} name="bookmark-outline" size={24} color="black" />
			</View>
			<Text
				style={styles.recipeTitle}
				onPress={goToRecipeDetail}
			>
				{recipe.title}</Text>
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
					<Text style={styles.info}>Tags:</Text>
					<Tags
						initialTags={recipe.Tags.map(el => el.name)}
						readonly
						deleteTagOnPress={false}
					/>
				</View>
			</View>

			<ModalAddPlan 
				isVisible={showModal}
				recipe={recipe}
				onClose={closeModal}
			/>

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
		marginTop: -5,
		marginBottom: 5,
		marginLeft: 10,
	},
	usernameStyle: {
		fontSize: 12,
		letterSpacing: 1.5
	},
	favoriteButton: {
		marginLeft: 5
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