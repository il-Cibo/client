import React from 'react';
import { StyleSheet, View } from 'react-native';
import BouncingPreloader from 'react-native-bouncing-preloader';

export default function Loading() {
  return (
    <View style={styles.container}>
      <BouncingPreloader
        icons={[
          'https://www.shareicon.net/data/128x128/2017/04/22/885104_food_512x512.png',
          'https://www.shareicon.net/data/256x256/2016/05/04/759946_bar_512x512.png',
          null,
          'https://www.shareicon.net/data/512x512/2017/04/22/885110_food_512x512.png',
          'https://www.shareicon.net/data/512x512/2017/04/22/885121_food_512x512.png'
        ]}
        leftRotation="-680deg"
        rightRotation="360deg"
        leftDistance={-180}
        rightDistance={-250}
        speed={1500}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
