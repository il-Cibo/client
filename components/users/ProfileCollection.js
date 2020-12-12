import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ProfileCollection = () => {
  return (
    <View>
      <Text style={styles.username}>thedarknight Collection's</Text>

      {/* Card component disini */}
    </View>
  )
}

export default ProfileCollection

const styles = StyleSheet.create({
  username: {
    padding: 25,
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    marginVertical: 20,
  },
})