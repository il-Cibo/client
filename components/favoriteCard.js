import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { LIST_FAV_USER_RECIPE, DELETE_RECIPE_FAV } from '../config/queries'
import { useMutation, useQuery } from '@apollo/client'
import { ModalAddPlan } from './'
import Tags from "react-native-tags";
import { tokenVar } from '../store/makeVar'
import { Loading } from '../components'

function FavoriteCard({ navigation, recipe, username }) {
	const [like, setLike] = useState(true)
	const [showModal, setShowModal] = useState(false)
	const [tags, setTags] = useState()

	const closeModal = () => {
		setShowModal(false)
	}

	const openModal = () => {
		setShowModal(true)
	}

	useEffect(() => {
		if(recipe.Tags) {
			const newTags = recipe.Tags.map((el) => {
				return el.name
			})

			setTags(newTags)
		}
	},[])
	function goToRecipeDetail() {
		navigation.navigate('DetailRecipe', {
			recipeData: recipe,
			user: username
		})
	}

	const { loading, error, data, refetch } = useQuery(LIST_FAV_USER_RECIPE, {
		context: {
			headers: {
				token: tokenVar()
			}
		}
	})

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

	const [deleteFromFav] = useMutation(DELETE_RECIPE_FAV, {
		context: {
			headers: {
				token: tokenVar()
			}
		},

	})

	const deleteThisFromFav = () => {
		deleteFromFav({
			variables: {
				id: recipe.id,
				UserRecipe: {
					UserId: data?.user?.id,
					RecipeId: recipe.id,
					favorites: false,
					plan: []
				}
			}
		})
		refetch()
	}

	return (
		<Card containerStyle={{ borderRadius: 10, borderColor: '#dcdde1' }}>
			<View style={styles.cardHeader}>
				<View style={styles.userInfo}>
					<Image
						style={styles.userPic}
						source={require('../assets/woman.svg')}
					/>
					<Text style={styles.usernameStyle}>{username}</Text>
				</View>
			</View>
			<Card.Image
				source={{ uri: recipe.image }} />
				<View style={{
					flexDirection: 'row',
					paddingTop: 10
				}}>
					{like && <MaterialIcons onPress={deleteThisFromFav} name="favorite" size={24} color="red" style={styles.deleteButton} />}
					<MaterialCommunityIcons onPress={openModal} name="bookmark-outline" size={24} color="black" />
				</View>
			<Text style={styles.recipeTitle} onPress={goToRecipeDetail}>{recipe.title}</Text>
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
					<Text style={styles.info}>Tags: </Text>
					<Tags
						initialTags={tags}
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
		fontSize: 13,
		fontFamily: 'Oswald',
		letterSpacing: 1
	},
	favoriteButton: {
		marginTop: 5,
		marginLeft: 5
	},
	deleteeButton: {
		marginTop: 5,
		marginLeft: 5,
		alignContent: 'flex-end'
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

export default FavoriteCard