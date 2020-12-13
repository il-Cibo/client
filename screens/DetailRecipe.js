import React from 'react'
import { View, StyleSheet, Image, ScrollView } from 'react-native'
// import { Accordion, Header, Tab, Tabs, Container, H1, H2, H3, Content, Card, CardItem, Title, Segment, Text, Button, Icon, Left, Body, Right } from 'native-base'
import Ingerdients from '../components/DetailRecipe/ingredients'
import CookingStep from '../components/DetailRecipe/CookingStep'


export default function Description() {
  return (
    <View style={styles.container}>
      <Container>
        <Header hasTabs />
        <Tabs >
          <Tab heading="Description">
            <Content>
            {/* <Icon name='arrow-back' style={{ margin: 10 }} /> */}
              <Card>
                <CardItem>
                  <Left>
                    {/* <Thumbnail source={{ uri: 'https://png.pngtree.com/png-clipart/20190924/original/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_4815126.jpg' }} /> */}
                    <Body>
                      <Text style={{ fontSize: 25 }}>Nama Masakan</Text>
                      <Text note>oleh Username</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636' }} style={{ height: 200, width: null, flex: 1, borderRadius: 20, borderWidth: 4, borderColor: '#fff', }} />
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent>
                      <Icon active name="thumbs-up" />
                      <Text>12</Text>
                    </Button>
                    <Button transparent>
                      <Icon active name="time" />
                      <Text>90 Menit</Text>
                    </Button>
                  </Left>
                </CardItem>
              </Card>
              <H3 style={{marginRight: 10, marginLeft: 10, fontFamily:''}}>{"\n"} thank you , it almost solved my problem .. I edited my question so can you please double check for me .. In fact i need to make all red , not just when it's active </H3>
            </Content>
          </Tab>
          <Tab heading="Ingerdients">
            <Ingerdients />
          </Tab>
          <Tab heading="Coking Steps">
          <CookingStep />
          </Tab>
        </Tabs>
      </Container>
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