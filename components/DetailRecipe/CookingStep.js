import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CookingStep(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>How to Cook</Text>
      <View style={styles.ingredientList}>
        <Text style={styles.ingredientItem}>1. Beef 200g</Text>
        <Text style={styles.ingredientItem}>2. Vegetables</Text>
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
    marginLeft: 15
  }, 
  ingredientList: {
    marginLeft: 20
  },
  ingredientItem: {
    marginTop: 10
  }
})