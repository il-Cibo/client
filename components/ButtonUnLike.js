import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { LIST_FAV_USER_RECIPE, DELETE_RECIPE_FAV, GET_ALL_RECIPES} from '../config/queries'
import {useSelector} from "react-redux"
import {useMutation, useQuery} from '@apollo/client'

export default function ButtonUnLike({setLike, recipeId}) {

    const token = useSelector((state) => state.token)

    const { data, } = useQuery(GET_ALL_RECIPES, {
		context: {
			headers: {
				token: token
			}
		}
    })
    
    console.log({data}, data?.user?.id);
    console.log({recipeId});

    const [deleteFromFav] = useMutation(DELETE_RECIPE_FAV, {
        context: {
			headers: {
				token: token
			}
		},
       
    })

    const deleteThisFromFav = () => {
        setLike(false)
        deleteFromFav({
            variables: {
				id: recipeId,
				UserRecipe: {
					UserId: data?.user?.id,
					RecipeId: recipeId,
					favorites: false,
					plan: []
				}
			}
        })
    }
    return (
        <View>
            <MaterialIcons onPress={deleteThisFromFav} name="favorite" size={24} color="red" style={styles.deleteButton} />
        </View>
    )
}

const styles = StyleSheet.create({
    deleteeButton: {
        marginTop: 5,
        marginLeft: 5,
        alignContent: 'flex-end'
    }
})
