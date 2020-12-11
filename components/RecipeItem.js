import React from 'react'
import { View, Text } from 'react-native'
import { Container, Footer, Content, SwipeRow, Icon, View, List, ListItem, Thumbnail, Text, Left, Body, Right, Button, Accordion, Header } from 'native-base';
export default function RecipeItem() {
    return (
        <View>
            <Content padder>
                <List>
                    <ListItem thumbnail>
                        <Left>
                            <Thumbnail square source={{ uri: 'https://thumbs.dreamstime.com/b/male-avatar-icon-flat-style-male-user-icon-cartoon-man-avatar-vector-stock-91602735.jpg' }} />
                        </Left>
                        <Body>
                            <SwipeRow
                                rightOpenValue={-75}
                                body={
                                    <View>
                                        <Text>Indomie</Text>
                                        <Text note numberOfLines={1}>Teman Setia anak Kost ditengah musim hujan. .</Text>
                                    </View>
                                }
                                right={
                                    <>
                                        <Button danger onPress={() => alert('Trash')}>
                                            <Icon active name="trash" />
                                        </Button>
                                        <Button success onPress={() => alert('Edit')}>
                                            <Icon active name="cog" />
                                        </Button>
                                    </>
                                }
                            />

                        </ Body>
                    </ListItem>
                </List>

                {/* <Accordion dataArray={'dataArray'} icon="add" expandedIcon="remove" /> */}
            </Content>
        </View>
    )
}
