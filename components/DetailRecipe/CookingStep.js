import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function CookingStep(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>How to Cook</Text>
      <View style={styles.stepList}>
        {props.steps.map((item, i) => (
          <View key={i}>
            <Text style={styles.stepItem}>{i+1}. {item}</Text>
          </View>
        ))}
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
  stepList: {
    marginLeft: 20
  },
  stepItem: {
    marginTop: 10
  }
})