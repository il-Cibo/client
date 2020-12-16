import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Platform } from 'react-native';
import { AddForm } from '../components'
import { EDIT_RECIPE, GET_ALL_RECIPES, GET_RECIPE } from '../config/queries'
import { useMutation, useQuery } from '@apollo/client'
import { useSelector } from 'react-redux'
import * as mime from 'react-native-mime-types';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper'
import Constants from 'expo-constants'

const EditRecipe = ({ route }) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbWFuZGFqZWhhbiIsImlhdCI6MTYwODAzMTg0Mn0.s_2T4KCIkcjWY6HC1IZaUyshDHNFJHUzymftYk1w0mY"
  // const token = useSelector((state) => state.token)
  const { recipeId } = route.params
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [cookingSteps, setCookingSteps] = useState('')
  const [serving, setServing] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [tag, setTags] = useState('')
  const { loading, error, data } = useQuery(GET_RECIPE, {
    context: {
      headers: {
        token: token
      }
    },
    variables: {
      id: recipeId
    }
  })

  const [updateRecipe] = useMutation(EDIT_RECIPE, {
    context: {
      headers: {
        token: token
      }
    }
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
  
  useEffect(() => {
    if (data) {
      const newTags = data.recipe.Tags.map((el) => {
        return el.name
      }).join('\n')
      setTitle(data.recipe.title)
      setDescription(data.recipe.description)
      setImage(data.recipe.image)
      setIngredients(data.recipe.ingredients.join('\n'))
      setCookingSteps(data.recipe.step.join('\n'))
      setServing(data.recipe.serving.toString())
      setCookingTime(data.recipe.time.toString())
      setTags(newTags)
    }
  }, [data])

  if (loading) {
    return <Text> Loading... </Text>
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
          <Ionicons style={styles.cameraIcon} name='camera' onPress={pickImage} />
        </View>
      )
    } else if (image) {
      return (
        <View style={styles.camera}>
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} onPress={pickImage} />
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

  const editRecipe = () => {
    const file = generateRNFile(image, `picture-${Date.now()}`)

    const recipe = {
      title: title,
      description: description,
      image: file,
      ingredients: ingredients.split('\n'),
      step: cookingSteps.split('\n'),
      serving: +serving,
      time: +cookingTime
    }

    console.log(recipe, '<<< data recipe setelah update');

    const tagData = tag.split('\n')

    updateRecipe({
      variables: {
        id: data.recipeid,
        recipe: recipe,
        tags: tagData
      }
    })
  }

  return (
    <View style={styles.container}>
      {/* <View>{JSON.stringify(data)}</View> */}
      <View>
        <Text style={styles.title}>Edit Recipe</Text>
      </View>
      {checkImage()}
      <Button onPress={pickImage}>Change Photo</Button>
      <ScrollView>
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
              placeholderText="Recipe's description"
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
              placeholderText="Recipe's cooking time"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.inputLabel}>Ingredients</Text>
            <AddForm
              labelValue={ingredients}
              onChangeText={(ingredients) => setIngredients(ingredients)}
              placeholderText="Recipe's ingredients"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.inputLabel}>Cooking steps</Text>
            <AddForm
              labelValue={cookingSteps}
              onChangeText={(cookingSteps) => setCookingSteps(cookingSteps)}
              placeholderText="Steps of how to cook"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <Text style={styles.inputLabel}>Tags</Text>
            <AddForm
              labelValue={tag}
              onChangeText={(tag) => setTags(tag)}
              placeholderText="Input recipe's tags here"
              autoCapitalize="none"
              autoCorrect={false}
            />

          </View>
          <Button style={styles.submit} onPress={editRecipe}>Save Recipe</Button>
        </View>
      </ScrollView>
    </View>
  )
}

export default EditRecipe

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 14
  },
  input: {
    padding: 10,
    fontSize: 16,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFF'

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
    color: '#000000',
    fontFamily: 'Oswald',
  },
  camera: {
    alignItems: 'center',
  },
  cameraIcon: {
    color: 'black',
    fontSize: 30,
  },
})