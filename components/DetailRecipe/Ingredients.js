import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function Ingredients(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ingredients</Text>
      <View style={styles.ingredientList}>
        <View style={styles.ingredientItem}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text>Beef 200g</Text>
        </View>
        <View style={styles.ingredientItem}>
          <Entypo name="dot-single" size={24} color="black" />
          <Text>Carrots</Text>
        </View>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    letterSpacing: 1.5,
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 10
  },
  ingredientList: {
    marginLeft: 20
  },
  ingredientItem: {
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center',
    flexDirection: 'row'
  }
})