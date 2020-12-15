import React, { useState } from 'react'
import { View, FlatList, Dimensions, StyleSheet, Image, TouchableOpacity, Text } from 'react-native'
const itemSize = (Dimensions.get('window').width - 12) / 3

const Gallery = ({ data, user }) => {
  const [total, setTotal] = useState(data.length)

  if(!data) {
    return <Text>Loading ...</Text>
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => console.log(item)} >
        <Image 
          style={styles.imageCollection}
          source={{uri: item.image}}
        />
      </TouchableOpacity>
    )
  }
  return (
    <View>
      <Text style={styles.username}>{user.username} Collection's</Text>
      <View style={styles.images}> 
        <FlatList 
          data={data}
          numColumns={3}
          keyExtractor={(item, index) => String(index)}
          renderItem={renderItem}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  images: {
    flexDirection: 'row',
    paddingHorizontal: 0.5
  },
  imageCollection: {
    width: itemSize,
    height: itemSize,
    margin: 1.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  username: {
    paddingTop: 20,
    paddingLeft: 25,
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
})


export default Gallery
