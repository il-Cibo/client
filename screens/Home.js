import React, {useState} from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { RecipeCard, Loading } from '../components'
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import { GET_ALL_RECIPES } from '../config/queries'
import { ADD_TO_FAVORITE_RECIPE } from '../config/queries'
import { Octicons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import Favorite from './Favorite'


function Home({ navigation, ...props }) {
    const [userId, setUserId] = useState();
	const [recipeId, setRecipeId] = useState();
	const [status, setStatus] = useState(false);
	// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0bG9naW4iLCJpYXQiOjE2MDc4NjMzMzZ9.cAErNfgFsC2y9VAuO3xvAU1-KoB7k83-Vbf2CzL9muY"
	const token = useSelector((state) => state.token)
	const { loading, error, data } = useQuery(GET_ALL_RECIPES, {
		context: {
			headers: {
				token: token
			}
		}
	})
	const [newFavRecipe] = useMutation (ADD_TO_FAVORITE_RECIPE , {
		context: {
			headers: {
				token: token
			}
		}
	})

	const addFavorite = (recipeId) => {
		setUserId(data?.user?.id)
		setRecipeId(recipeId)
		setStatus(!status)
		onsubmit()
	}

	const onsubmit = () => {
        // event.preventDefault()

        newFavRecipe({
            variables: {
                user: {
                    UserId: userId,
					RecipeId: recipeId,
					Favorite: status,
					plan : []
                }
            }
        })
    }
	 
	if (loading) {
		return <Text>Loading ...</Text>
	}

	if (error) {
		return (
			<View style={styles.container}>
				<Text>{JSON.stringify(error.message)}</Text>
			</View>
		)
	}

	function goToSearch() {
		navigation.navigate('Search')
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.headerText}>Mealo</Text>
				<Octicons name="search" size={24} color="black" onPress={goToSearch} />
				
			</View>
			<Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
			<ScrollView>
				{/* <TouchableOpacity>
				<Text>{JSON.stringify(data)}</Text>
				<Icon name="Favorite" onPress={addFavorite(data?.recipes?.id)}/>
				</TouchableOpacity> */}
				<Text>{JSON.stringify(data)}</Text>
				{data.recipes.map((recipePost) => (
					<RecipeCard key={recipePost.id} recipe={recipePost} navigation={navigation} />
				))}
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

export default Home