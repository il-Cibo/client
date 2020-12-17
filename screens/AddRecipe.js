import React, { useState, useEffect } from 'react';
import { Image, View, Platform, StyleSheet, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { Loading } from '../components'
import { UPLOAD_RECIPE, GET_ALL_RECIPES } from '../config/queries'
import { useMutation } from '@apollo/client'
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';
import Constants from 'expo-constants'
import { Button, TextInput } from 'react-native-paper'
import { Divider } from 'react-native-elements'

const AddRecipe = ({ navigation }) => {
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [image, setImage] = useState(null)
  const [ingredients, setIngredients] = useState()
  const [cookingSteps, setCookingSteps] = useState()
  const [serving, setServing] = useState()
  const [cookingTime, setCookingTime] = useState()
  const [tag, setTags] = useState()
  const [uploadRecipe, { loading, error }] = useMutation(UPLOAD_RECIPE, {
    refetchQueries: [
      { query: GET_ALL_RECIPES }
    ]
  })

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  if (loading) {
    return (
      <Loading />
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    )
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const checkImage = () => {
    if (!image) {
      return (
        <View style={styles.camera}>
          <Ionicons style={styles.cameraIcon} name='camera' />
          <Button mode="contained" labelStyle={styles.buttonStyle} style={{backgroundColor: '#353b48'}} onPress={pickImage}>Take a Photo</Button>
        </View>
      )
    } else if (image) {
      return (
        <View style={styles.camera}>
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
          <Button mode="contained" labelStyle={styles.buttonStyle} style={{backgroundColor: '#353b48'}} onPress={pickImage}>Change Photo</Button>
        </View>
      )
    }
  }

  const generateRNFile = (uri, name) => {
    return uri ? new ReactNativeFile({
      uri,
      type: mime.lookup(uri) || 'image',
      name,
    }) : null;
  }

  const addNewRecipe = () => {
    const file = generateRNFile(image, `picture-${Date.now()}`)

    const recipe = {
      title: title,
      description: description,
      image: file,
      ingredients: ingredients.split('\n'),
      step: cookingSteps.split('\n'),
      serving: +serving,
      time: +cookingTime,
    }

    const tagData = tag.split('\n')

    uploadRecipe({
      variables: {
        recipe: recipe,
        tags: tagData
      }
    })
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.navigate('Home')} />
          <Text style={styles.title}>New Recipe</Text>
        </View>
        <Divider style={{ height: 1.5, backgroundColor: '#f5f6fa' }} />
        {checkImage()}
        <Divider style={{ height: 1.5, backgroundColor: '#f5f6fa', marginTop: 15 }} />
        <View style={styles.inputForm}>
          <View style={styles.formBox}>
            <TextInput
              value={title}
              label="Title"
              placeholder="Insert title"
              underlineColor="#FF9494"
              multiline={true}
              mode="outlined"
              style={styles.inputFormStyle}
              onChangeText={(title) => setTitle(title)}
            />
          </View>

          <View style={styles.formBox}>
            <TextInput
              value={description}
              label="Description"
              placeholder="Insert description"
              underlineColor="#FF9494"
              multiline={true}
              mode="outlined"
              style={styles.inputFormStyle}
              onChangeText={(description) => setDescription(description)}
            />
          </View>

          <View style={styles.formBox}>
            <TextInput
              value={serving}
              label="Serving"
              placeholder="Insert serving size"
              selectionColor="#FF9494"
              underlineColor="#FF9494"
              multiline={true}
              mode="outlined"
              style={styles.inputFormStyle}
              onChangeText={(serving) => setServing(serving)}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.formBox}>
            <TextInput
              value={cookingTime}
              label="Cooking Time"
              placeholder="Insert cooking time"
              underlineColor="#FF9494"
              multiline={true}
              mode="outlined"
              style={styles.inputFormStyle}
              onChangeText={(cookingTime) => setCookingTime(cookingTime)}
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.formBox}>
            <TextInput
              value={ingredients}
              label="Ingredients"
              placeholder="Insert ingredients"
              multiline={true}
              mode="outlined"
              style={styles.inputFormStyle}
              onChangeText={(ingredients) => setIngredients(ingredients)}
            />
          </View>

          <View style={styles.formBox}>
            <TextInput
              value={cookingSteps}
              label="Steps of Cooking"
              placeholder="Insert steps of cooking"
              underlineColor="#FF9494"
              multiline={true}
              mode="outlined"
              style={styles.inputFormStyle}
              onChangeText={(cookingSteps) => setCookingSteps(cookingSteps)}
            />
          </View>

          <View style={styles.formBox}>
            <TextInput
              value={tag}
              label="Tags"
              placeholder="Insert tags"
              underlineColor="#FF9494"
              multiline={true}
              mode="outlined"
              style={styles.inputFormStyle}
              onChangeText={(input) => setTags(input)}
            />
          </View>
          <Button mode="contained" style={styles.submitButtonStyle} onPress={addNewRecipe}>Add Recipe</Button>
        </View>
      </ScrollView>
    </View>
  )
}

export default AddRecipe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    marginTop: Constants.statusBarHeight
  },
  header: {
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 30,
    fontFamily: 'Oswald',
  },
  inputForm: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  inputFormStyle: {
    fontSize: 15,
    fontFamily: 'Oswald'
  },
  formBox: {
    marginTop: 15
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: 240,
    marginBottom: -20,
  },
  cameraIcon: {
    color: 'black',
    fontSize: 40,
  },
  submitButtonStyle: {
    backgroundColor: '#FF9494',
    margin: 20
  },
  buttonStyle: {
    fontSize: 10,
    color: '#f5f6fa'
  }
})