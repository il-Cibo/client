import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card, BottomSheet, ListItem } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { LIST_FAV_USER_RECIPE, DELETE_RECIPE_FAV, GET_ALL_RECIPES } from '../config/queries'
import { useMutation, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'

const tagUndefined = "recipe"

function FavoriteCard({ navigation, recipe, username }) {
    const [tagFood, setTagFood] = useState('')
    const token = useSelector((state) => state.token)
    const [isVisible, setIsVisible] = useState(false)


	function goToRecipeDetail() {
		navigation.navigate('DetailRecipe', {
			recipeId: recipe.id
		})
	}

    const { data, refetch } = useQuery(LIST_FAV_USER_RECIPE, {
        context: {
            headers: {
                token: token
            }
        }
    })

    console.log({ recipe }, data);
    // let tagFood

    useEffect(() => {
        if (recipe.Tags[0] !== undefined) {
            var tag = recipe.Tags[0].name
            // tagFood = tag
            setTagFood(tag)
        }
        
    }, [])

    const [deleteFromFav] = useMutation(DELETE_RECIPE_FAV, {

        context: {
            headers: {
                token: token
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

	const { data, } = useQuery(GET_ALL_RECIPES, {
		context: {
			headers: {
				token: token
			}
		}
	})

	console.log({ data }, data?.user?.id);
	console.log({ id: recipe.id });

	const tagUndefined = "recipe"
	let tagFood
	if (recipe.Tags[0] !== undefined) {
		var tag = recipe.Tags[0].name
		tagFood = tag

	}

	// const { loading, error, data, refetch } = useQuery(LIST_FAV_USER_RECIPE)
	const [deleteFromFav] = useMutation(DELETE_RECIPE_FAV, {

		context: {
			headers: {
				token: token
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
				{/* <MaterialIcons onPress={() => setIsVisible(true)} name="keyboard-arrow-down" size={24} color="black" /> */}
				<MaterialIcons onPress={deleteThisFromFav} name="delete" size={24} color="black" style={styles.deleteButton} />
			</View>
			<Card.Image
				onPress={goToRecipeDetail}
				source={{ uri: recipe.image }} />
			{/* <MaterialIcons onPress={deleteFromFav(recipe.id)} name="favorite-outline" size={24} color="black" style={styles.favoriteButton} /> */}
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
					<Text style={styles.info}>Tags: {recipe.Tags[0] ? tagFood : tagUndefined}</Text>
				</View>

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
                {/* <MaterialIcons onPress={() => setIsVisible(true)} name="keyboard-arrow-down" size={24} color="black" /> */}
                <MaterialIcons onPress={deleteThisFromFav} name="delete" size={24} color="black" style={styles.deleteButton} />
            </View>
            <Card.Image
                onPress={goToRecipeDetail}
                source={{ uri: recipe.image }} />
            {/* <MaterialIcons onPress={deleteFromFav(recipe.id)} name="favorite-outline" size={24} color="black" style={styles.favoriteButton} /> */}
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
                    <Text style={styles.info}>Tags: {recipe.Tags[0] ? tagFood : tagUndefined}</Text>
                </View>

                {/* <MaterialIcons onPress={deleteThisFromFav(recipe.id)} name="delete" size={24} color="black" style={styles.favoriteButton} /> */}
            </View>
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
		fontSize: 13
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

export default FavoriteCard