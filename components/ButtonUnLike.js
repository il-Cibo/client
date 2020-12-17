import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { DELETE_RECIPE_FAV, LIST_FAV_USER_RECIPE} from '../config/queries'
import {useMutation} from '@apollo/client'
import { tokenVar } from '../store/makeVar'

export default function ButtonUnLike({setLike, recipeId}) {
    const [deleteFromFav] = useMutation(DELETE_RECIPE_FAV, {
      refetchQueries: {
        query: LIST_FAV_USER_RECIPE
      }
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
  deleteButton: {
    marginLeft: 5,
  }
})
