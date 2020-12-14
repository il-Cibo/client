import React, { useState } from 'react'
import { TouchableOpacity, Image, StyleSheet, ActivityIndicator, Text } from 'react-native'

const Images = ({
  style, 
  sourceObj,
  onPress
}) => {
  const [imageError, setImageError] = useState(false)
  const [loading, setLoading] = useState(true)
  
  console.log(sourceObj, 'ini source objs');
  return (
    // <Text>
    //   {JSON.stringify(sourceObj)}
    // </Text>
    <TouchableOpacity onPress={onPress}>
      {
        imageError || !sourceObj.image ? (
          <Image 
            source={require('../../assets/no_image.jpg')}
            style={style}
            onLoadEnd={() => setLoading(false)}
          />
        ) : (
          <Image 
            style={style}
            source={{uri: sourceObj.image}}
            onError={(e) => {
              setLoading(false)
              setImageError(true)
            }}
            onLoadEnd={() => {
              setLoading(false)
            }}
          />
        )
      }

      {
        loading && (
          <ActivityIndicator 
            style={styles.activityIndicator}
            animating={loading}
          />
        )
      }
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})
export default Images