import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { LIST_FAV_USER_RECIPE, DELETE_RECIPE_FAV, GET_ALL_RECIPES} from '../config/queries'
import {useSelector} from "react-redux"
import {useMutation, useQuery} from '@apollo/client'

export default function ButtonUnLike({setLike, recipeId}) {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0bG9naW4iLCJpYXQiOjE2MDc4NjMzMzZ9.cAErNfgFsC2y9VAuO3xvAU1-KoB7k83-Vbf2CzL9muY"
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
				id: recipeId
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
        // alignContent: 'flex-end'
    }
})