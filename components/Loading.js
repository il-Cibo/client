import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LottieView from 'lottie-react-native'

function Loading() {
    return (
      <View style={styles.container} >
        <LottieView
          style={{
            width: 250,
            height: 250,
          }}
          source={require('../assets/loading.json')}
          autoPlay
          loop
        />
        <Text style={styles.textStyle}>Loading, Please Wait ...</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		flexDirection: 'column',
		width: 360,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: '#FFF'
	},
	textStyle: {
		fontFamily: 'Oswald',
		fontSize: 24,
		color: '#FF9494',
		textAlign: 'center'
	}
});

export default Loading
