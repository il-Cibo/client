import React, { useState } from 'react'
import { View, StyleSheet, Image, Text, ScrollView } from 'react-native'
import { Ingredients, CookingStep } from '../components/DetailRecipe'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'
import { Divider } from 'react-native-elements'
import { BottomSheet, ListItem } from 'react-native-elements'
import { SimpleLineIcons } from '@expo/vector-icons'

export default function DetailRecipe({ navigation }) {
  const [isVisible, setIsVisible] = useState(false)
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
        navigation.navigate('EditRecipe')
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
        setIsVisible(false)
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={40} color="#EEE6E6" onPress={() => navigation.navigate('Home')} />
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.recipeImage}
          resizeMode="cover"
          source={{ uri: 'https://i.insider.com/5d0bc2a0e3ecba03841d82d2?width=960&format=jpeg' }} />
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 20 }}>
          <Text style={styles.recipeTitle}>Chicken Salad</Text>
          <SimpleLineIcons name="options" size={20} color="black" onPress={() => setIsVisible(true)} />
        </View>
        <Text style={styles.userInfo}>mealo_user</Text>

        <View style={styles.cookInfo}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="bowl-mix-outline" size={16} color="#747d8c" />
            <Text style={styles.info}>Serving: 5</Text>
          </View>
          <View style={styles.row}>
            <Ionicons name="timer-outline" size={16} color="#747d8c" />
            <Text style={styles.info}>Time Cook: 90 mins</Text>
          </View>
          <View style={styles.row}>
            <AntDesign name="tago" size={16} color="#747d8c" />
            <Text style={styles.info}>Tags: chicken</Text>
          </View>
        </View>
        <View>
          <Text style={styles.recipeDescription}>Delicious chicken salad, easy to make, easy to get healthy!</Text>
        </View>
        <Divider style={styles.divider} />
        <Ingredients />
        <Divider style={styles.divider} />
        <CookingStep />
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
    backgroundColor: '#fff'
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
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15
  },
  userInfo: {
    fontSize: 14,
    paddingLeft: 15
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
    fontSize: 9,
    marginLeft: 5
  },
  recipeDescription: {
    margin: 15,
    fontSize: 16
  },
  divider: {
    height: 1.5,
    backgroundColor: '#f5f6fa'
  }
})

  // < Card >
  //       <CardItem>
  //         {/* <Thumbnail source={{ uri: 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg' }} /> */}
  //         <Body>
  //           <Text style={{ fontSize: 25 }}>Nama Masakan</Text>
  //           <Text note>oleh Username</Text>
  //         </Body>
  //       </CardItem>
  //       <CardItem cardBody>
  //         <Image source={{ uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636' }} style={{ height: 200, width: null, flex: 1, borderRadius: 20, borderWidth: 4, borderColor: '#fff', }} />
  //       </CardItem>
  //       <CardItem>
  //         <Button transparent>
  //           <Icon active name="thumbs-up" />
  //           <Text>12</Text>
  //         </Button>
  //         <Button transparent>
  //           <Icon active name="time" />
  //           <Text>90 Menit</Text>
  //         </Button>
  //       </CardItem>
  //     </Card >