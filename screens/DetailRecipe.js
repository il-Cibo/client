import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { BottomSheet, ListItem } from 'react-native-elements'
import { Divider } from 'react-native-elements'
import { Ingredients, CookingStep } from '../components/DetailRecipe'
import { Loading } from '../components'
import { DELETE_RECIPE, GET_ALL_RECIPES } from '../config/queries'
import { useMutation } from '@apollo/client'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { tokenVar } from '../store/makeVar'
import Constants from 'expo-constants'

export default function DetailRecipe({ navigation, route }) {
  const { recipeData, page, user } = route.params
  const [isVisible, setIsVisible] = useState(false)
  const [deleteRecipe, { loading, error, data }] = useMutation(DELETE_RECIPE, {
    context: {
      headers: {
        token: tokenVar()
      }
    }
  }, {
    refetchQueries: [
      { query: GET_ALL_RECIPES }
    ]
  }, {
    fetchPolicy: 'network-only'
  })

  const list = [
    {
      title: 'Edit Recipe',
      containerStyle: {
        backgroundColor: '#FFF',
      },
      titleStyle: {
        color: 'black',
        marginLeft: 30,
      },
      onPress: () => {
        setIsVisible(false)
        navigation.navigate('EditRecipe', {
          recipeId: recipeData.id
        })
      }
    },
    {
      title: 'Delete Recipe',
      containerStyle: {
        backgroundColor: '#FFF',
      },
      titleStyle: {
        color: 'black',
        marginLeft: 30,
      },
      onPress: () => {
        deleteARecipe()
      }
    },
    {
      title: 'Cancel',
      containerStyle: {
        backgroundColor: '#FFF'
      },
      titleStyle: {
        color: 'black',
        marginLeft: 30,
      },
      onPress: () => setIsVisible(false)
    }
  ]
  
  const deleteARecipe = () => {
    setIsVisible(false)
    deleteRecipe({
      variables: {
        id: recipeData.id
      }
    })
    navigation.navigate('Home')
  }

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={40} color="#EEE6E6" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.recipeImage}
          resizeMode="cover"
          source={{ uri: recipeData.image }} />
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 20 }}>
          <Text style={styles.recipeTitle}>{recipeData.title}</Text>
          <SimpleLineIcons name="options" size={20} color="black" onPress={() => setIsVisible(true)} />
        </View>
        {page === 'home' ? <Text style={styles.userInfo}>By: {recipeData.Users.map((user) => user.username)}</Text> : <Text style={styles.userInfo}>By: {user}</Text>
        }
        <View style={styles.cookInfo}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="bowl-mix-outline" size={16} color="#747d8c" />
            <Text style={styles.info}>Serving: {recipeData.serving}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="timer-outline" size={16} color="#747d8c" />
            <Text style={styles.info}>Time Cook: {recipeData.time} mins</Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="tago" size={16} color="#747d8c" />
            <Text style={styles.info}>Tags: chicken</Text>
          </View>
        </View>
        <View>
          <Text style={styles.recipeDescription}>{recipeData.description}</Text>
        </View>
        <Divider style={styles.divider} />
        <Ingredients data={recipeData.ingredients} />
        <Divider style={styles.divider} />
        <CookingStep steps={recipeData.step} />
      </ScrollView>
      <BottomSheet
        style={{ height: 300 }}
        isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight
  },
  imageContainer: {
    width: '100%',
    height: 200
  },
  recipeImage: {
    width: '100%',
    height: '100%'
  },
  header: {
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 25,
    paddingLeft: 20,
    paddingTop: 25,
    backgroundColor: '#FF9494'
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 15,
    fontFamily: 'Oswald'
  },
  userInfo: {
    fontSize: 14,
    paddingLeft: 15,
    fontFamily: 'Oswald',
    letterSpacing: 1
  },
  cookInfo: {
    height: 80,
    marginTop: 5,
    marginLeft: 15,
    justifyContent: 'space-evenly',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  info: {
    color: "#747d8c",
    fontSize: 10,
    marginLeft: 5,
    fontFamily: 'Oswald',
    letterSpacing: 1
  },
  recipeDescription: {
    margin: 15,
    fontSize: 16,
    fontFamily: 'Oswald',
    letterSpacing: 1
  },
  divider: {
    height: 1.5,
    backgroundColor: '#f5f6fa'
  }
})