import React from 'react'
import { ProfileHeader, Gallery } from '../components'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../config/queries'
import { tokenVar } from '../store/makeVar'
import { Button } from 'react-native-elements'
import { Loading } from '../components'

const UserProfile = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_PROFILE, {
    context: {
      headers: {
        token: tokenVar()
      }
    }
  })

  if (loading) {
		return (
			<Loading />
		)
	}

	if (error) {
		return (
			<View style={styles.container}>
				<Text>{error.message}</Text>
			</View>
		)
	}

  return (
    <View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <ProfileHeader data={{ username: data.user.username, name: data.user.name, avatar: data.user.avatar }} />
          <View style={styles.container}>
            <Button title="LOGOUT" mode="contained" />
            <Gallery data={data.user.Recipes} user={data.user.username} navigation={navigation} />
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
