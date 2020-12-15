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
  const [userProfile, setUserProfile] = useState()
  const [userRecipe, setUserRecipe] = useState()
  // const token = useSelector((state) => state.token)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0bG9naW4iLCJpYXQiOjE2MDc4NjMzMzZ9.cAErNfgFsC2y9VAuO3xvAU1-KoB7k83-Vbf2CzL9muY"

  const { loading, error, data } = useQuery(GET_PROFILE, {
    context: {
      headers: {
        token: token
      }
    }
  })

  const userData = {
    "user": {
      "id": 3,
      "username": "testlogin",
      "email": "testlogin@mail.com",
      "gender": "male",
      "avatar": "https://image.flaticon.com/icons/png/512/1674/1674291.png",
      "Recipes": [
        {
          "id": 1,
          "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/1f2dae88-cb8d-4837-b798-74fe04657b34.png"
        },
        {
          "id": 2,
          "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/fe87fb9b-60c8-4eab-a1df-c2d4bdf6e418.png"
        },
        {
          "id": 3,
          "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/de779480-2420-43c4-8bee-5bfb7c580456.jpg"
        },
        {
          "id": 6,
          "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/0ed4b29e-6efd-4ae9-a2b0-3518ac3ab1a7.jpg"
        },
        {
          "id": 7,
          "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/ce7f637e-2e23-4aa0-a544-3ccd59687042"
        },
        {
          "id": 8,
          "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/ade93cb8-2f21-480d-a818-991d2839f4e9.jpg"
        }
      ]
    }
  }

  console.log(data, '<<< data user')
  useEffect(() => {
    setUserProfile({
      name: userData.user.name,
      username: userData.user.username,
      avatar: userData.user.avatar
    })

  //   setUserRecipe({
  //     username: data.user.username,
  //     recipes: data.user.Recipes
  //   })
  }, [])

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
    <View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <ProfileHeader data={userProfile}/>
          <View style={styles.container}>
            <Gallery data={userData.user.Recipes} user={userProfile}/>
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
