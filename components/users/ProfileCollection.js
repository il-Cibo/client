import React, { useState } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableHighlight, ImageBackground } from 'react-native'

const numColumns = 3;
const data = [
  {
    "id": 1,
    "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/1f2dae88-cb8d-4837-b798-74fe04657b34.png",
    "ingredients": [
      "ayam 1 ekor",
      "tepung 200g"
    ],
    "serving": 4,
    "step": [
      "goreng dalam minyak panas",
      "tiriskan, sajikan"
    ],
    "time": 30,
    "title": "Mie Ayam Goreng",
    "Tags": [
      {
        "name": "test"
      },
      {
        "name": "test2"
      }
    ]
  },
  {
    "id": 2,
    "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/fe87fb9b-60c8-4eab-a1df-c2d4bdf6e418.png",
    "ingredients": [
      "ayam 1 ekor",
      "tepung 200g"
    ],
    "serving": 4,
    "step": [
      "goreng dalam minyak panas",
      "tiriskan, sajikan"
    ],
    "time": 30,
    "title": "TEST Pake header",
    "Tags": [
      {
        "name": "test"
      },
      {
        "name": "test2"
      }
    ]
  },
  {
    "id": 3,
    "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/de779480-2420-43c4-8bee-5bfb7c580456.jpg",
    "ingredients": [
      "ayam 1 ekor",
      "tepung 200g"
    ],
    "serving": 4,
    "step": [
      "goreng dalam minyak panas",
      "tiriskan, sajikan"
    ],
    "time": 30,
    "title": "TEST Pake header",
    "Tags": [
      {
        "name": "test"
      },
      {
        "name": "test2"
      }
    ]
  },
]

const ProfileCollection = ({ user }) => {
  const [loading, setLoading] = useState(true)
  

  console.log(data.length);
  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
  
    return data;
  };
  
  const checkPicture = (value) => {
    console.log(value);
  }
  
  const renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    
    setLoading(false)
    return (
      <View style={styles.item}>
        <TouchableHighlight onPress={(item) => {checkPicture(item)}}>
          <Text style={styles.itemText}>{item.key}</Text>
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.username}>{user.username} Collection's</Text>
      <FlatList
        data={formatData(user.recipes, numColumns)}
        style={styles.container}
        renderItem={renderItem}
        numColumns={numColumns}
      />
      {/* <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={renderItem}
        numColumns={numColumns}
      /> */}
    </View>
  )
}

export default ProfileCollection

const styles = StyleSheet.create({
  username: {
    paddingTop: 20,
    paddingLeft: 25,
    fontSize: 20,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    marginVertical: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
})