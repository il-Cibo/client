import React, { useState, useEffect } from 'react'
import { ProfileHeader, ProfileCollection } from '../components'
import { Card } from 'react-native-elements'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text
} from 'react-native'

import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../config/queries'
import { useSelector } from 'react-redux'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState()
  const [userRecipe, setUserRecipe] = useState()
  const token = useSelector((state) => state.token)
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0bG9naW4iLCJpYXQiOjE2MDc4NjMzMzZ9.cAErNfgFsC2y9VAuO3xvAU1-KoB7k83-Vbf2CzL9muY"

  const { loading, error, data } = useQuery(GET_PROFILE, {
    context: {
      headers: {
        token: token
      }
    }
  })
  console.log(data, '<<< data user')
  useEffect(() => {
    setUserProfile({
      name: data.user.name,
      username: data.user.username,
      avatar: data.user.avatar
    })

    setUserRecipe({
      username: data.user.username,
      recipes: data.user.Recipes
    })
  }, [])

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
  
  if(loading) {
    return (
      <View style={styles.container}>
        <Text>Loading ...</Text>
      </View>
    )
  }

  if(error) {
    console.log(error);
    return (
      <View style={styles.container}>
        <Text>{JSON.stringify(error.message)}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Card containerStyle={styles.cardContainer}>
          <ProfileHeader data={userProfile}/>
          {/* {checkCollection()} */}
          {/* <ProfileHeader data={profiles} /> */}
          <SafeAreaView>
            <ProfileCollection data={photos} user={userRecipe} />
          </SafeAreaView>
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
