import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
// import { Header, Tab, Tabs, Container, H3, Content, Card, CardItem, Text, Button, Icon, Left, Body } from 'native-base'
import Ingerdients from '../components/DetailRecipe/ingredients'
import CookingStep from '../components/DetailRecipe/CookingStep'
import { Card, Button } from 'react-native-elements'

export default function DetailRecipe() {
  return (
    <View style={styles.container}>
      <Card>
        <CardItem>
          {/* <Thumbnail source={{ uri: 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg' }} /> */}
          <Body>
            <Text style={{ fontSize: 25 }}>Nama Masakan</Text>
            <Text note>oleh Username</Text>
          </Body>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636' }} style={{ height: 200, width: null, flex: 1, borderRadius: 20, borderWidth: 4, borderColor: '#fff', }} />
        </CardItem>
        <CardItem>
          <Button transparent>
            <Icon active name="thumbs-up" />
            <Text>12</Text>
          </Button>
          <Button transparent>
            <Icon active name="time" />
            <Text>90 Menit</Text>
          </Button>
        </CardItem>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '45%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 5,
    backgroundColor: '#fff'
  }
})