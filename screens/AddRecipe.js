import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AddForm } from '../components'
import { UPLOAD_RECIPE } from '../config/queries'
import { useMutation } from '@apollo/client'
import { ReactNativeFile } from 'apollo-upload-client';
import * as mime from 'react-native-mime-types';

const AddRecipe = () => {
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [serving, setServing] = useState()
  const [cookingTime, setCookingTime] = useState()
  const [ingredients, setIngredients] = useState()
  const [cookingSteps, setCookingSteps] = useState()
  const [tags, setTags] = useState()

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

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const checkImage = () => {
    if (!image) {
      return (
        <View style={styles.camera}>
          <Ionicons style={styles.cameraIcon} name='camera' onPress={pickImage}/>
          <Text style={{fontWeight: 'bold'}}>Add Photo</Text>
        </View>
      )
    } else if (image) {
      return (
        <View style={styles.camera}>
          <Image source={{uri: image}} style={{width: 20, height: 20}} onPress={pickImage}/>
          <Text style={{fontWeight: 'bold'}}>Change Photo</Text>
        </View>
      )
    }
  }
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0bG9naW4iLCJpYXQiOjE2MDc4NjMzMzZ9.cAErNfgFsC2y9VAuO3xvAU1-KoB7k83-Vbf2CzL9muY"
  
  const [uploadRecipe] = useMutation(UPLOAD_RECIPE, {
		context: {
			headers: {
				token: token
			}
		}
	})

  const generateRNFile = (uri, name) => {
    return uri ? new ReactNativeFile({
      uri,
      type: mime.lookup(uri) || 'image',
      name,
    }) : null;
  }

  const addNewRecipe = async () => {

    const file = generateRNFile(image, `picture-${Date.now()}`)

    const recipe = {
      title: title,
      description: description,
      image: file,
      serving: +serving,
      time: +cookingTime,
      step: cookingSteps.split('\n'),
      ingredients: ingredients.split('\n')
    }

    const tagData = tags.split('\n')

    console.log(recipe);
    console.log(tagData);

    uploadRecipe({
      variables: {
        recipe: recipe,
        tags: tagData
      }
    })
    // console.log(`${recipe}\n${tagData}`);
  }
  return (
    <SafeAreaView>
      <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Add New Recipe</Text>
            </View>
            {checkImage()}
          </View>

          <View style={styles.inputForm}>
            <View>
              <Text style={styles.inputLabel}>Title</Text>
              <AddForm
                labelValue={title}
                onChangeText={(title) => setTitle(title)}
                placeholderText="Recipe title"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.inputLabel}>Description</Text>
              <AddForm
                labelValue={description}
                onChangeText={(description) => setDescription(description)}
                placeholderText="Description"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.inputLabel}>Serving</Text>
              <AddForm
                labelValue={serving}
                onChangeText={(serving) => setServing(serving)}
                placeholderText="Serving size"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.inputLabel}>Cooking Time</Text>
              <AddForm
                labelValue={cookingTime}
                onChangeText={(cookingTime) => setCookingTime(cookingTime)}
                placeholderText="Cooking time"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.inputLabel}>Ingredients</Text>
              <AddForm
                labelValue={ingredients}
                onChangeText={(ingredients) => setIngredients(ingredients)}
                placeholderText="Ingredients"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.inputLabel}>Cooking steps</Text>
              <AddForm
                labelValue={cookingSteps}
                onChangeText={(cookingSteps) => setCookingSteps(cookingSteps)}
                placeholderText="Ingredients"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <Text style={styles.inputLabel}>Tags</Text>
              <AddForm
                labelValue={tags}
                onChangeText={(tags) => setTags(tags)}
                placeholderText="Ingredients"
                autoCapitalize="none"
                autoCorrect={false}
              />

            </View>
            <Button title='Add new recipe' style={styles.submit} onPress={addNewRecipe}/>
          </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default AddRecipe

const styles = StyleSheet.create({
  submit: {
    backgroundColor: '#FF9494',
    margin: 10
  },
  inputForm: {
    // paddingTop: 100,
    paddingLeft: 24,
    paddingRight: 20,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 20
  },
  input: {
    padding: 10,
    flex: 1,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingTop: 20,
    flex: 1, 
    flexDirection: 'row',  
    justifyContent: 'space-between'
  },
  textStyle: {
    color: 'black',
    alignSelf: 'center',
    margin: 20,
  },
  title: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#000000'
  },
  camera: {
    alignItems: 'center',
    paddingRight: 24,
    paddingTop: 12
  },
  cameraIcon: {
    color: 'black',
    fontSize: 30,
  },
})