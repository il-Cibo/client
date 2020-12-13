import React, { useState, useEffect } from 'react'
import { ProfileHeader, ProfileCollection } from '../components'

import { Card } from 'react-native-elements'
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'

import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../config/queries'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState()
  const { loading, error, data } = useQuery(GET_PROFILE)

  useEffect(() => {
    setUserProfile(data)
  })

  const profiles = {
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

  const checkCollection = () => {
    if (userProfile.Recipe.length > 0) {
      return (
        <ProfileCollection data={userProfile.Recipe}/>
      )
    } else {
      return (
        <Text>No Recipes Collection</Text>
      )
    }
  }
  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          {/* <ProfileHeader data={userProfile}/>
          {checkCollection()} */}
          <ProfileHeader data={profiles} />
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
