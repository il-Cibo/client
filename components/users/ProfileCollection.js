import React from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableHighlight } from 'react-native'

const numColumns = 3;

const ProfileCollection = ({ data }) => {
  console.log(data);

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
      <Text style={styles.username}>thedarknight Collection's</Text>
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={renderItem}
        numColumns={numColumns}
      />
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