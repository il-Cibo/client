import React, { useState, useEffect } from 'react'
import { ProfileHeader, Gallery } from '../components'
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
  // const [userProfile, setUserProfile] = useState()
  // const [userRecipe, setUserRecipe] = useState()
  const token = useSelector((state) => state.token)
  const user = useSelector((state) => state.user)

  const { loading, error, data } = useQuery(GET_PROFILE, {
    context: {
      headers: {
        token: token
      }
    }
  })

  console.log(user);

  // if(error) {
  //   console.log(error);
  //   return (
  //     <View style={styles.container}>
  //       <Text>{JSON.stringify(error.message)}</Text>
  //     </View>
  //   )
  // }

  if(loading) {
    return <View style={styles.container}><Text>Loading ...</Text></View>
  }

  return (
    <View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <ProfileHeader data={{username: data.user.username, name: data.user.name, avatar: data.user.avatar}}/>
          <View style={styles.container}>
            <Gallery data={data.user.Recipes} user={data.user.username}/>
          </View>
        </View>
      </ScrollView>
    </View>
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
