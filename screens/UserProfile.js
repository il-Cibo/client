import React from 'react'
import { ProfileHeader, ProfileCollection } from '../components'

import { Card } from 'react-native-elements'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

const UserProfile = () => {
  const profile = {
    name: 'Bruce Wayne',
    username: 'thedarknight',
    userImage: 'https://image.flaticon.com/icons/png/512/1674/1674291.png',
    totalLikes: 177
  }

  const photos = [
    { key: 'A' }, 
    { key: 'B' }, 
    { key: 'C' }, 
    { key: 'D' }, 
    { key: 'E' }, 
    { key: 'F' }, 
    { key: 'G' }, 
    { key: 'H' }, 
    { key: 'I' }, 
    { key: 'J' }
  ]

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <ProfileHeader data={profile} />
          <ProfileCollection data={photos} />
        </Card>
      </View>
    </ScrollView>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
})
