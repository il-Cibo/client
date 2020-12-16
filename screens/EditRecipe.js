import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, Platform } from 'react-native';
import { EDIT_RECIPE, GET_RECIPE } from '../config/queries'
import { useMutation, useQuery } from '@apollo/client'
import * as mime from 'react-native-mime-types';
import * as ImagePicker from 'expo-image-picker';
import { ReactNativeFile } from 'apollo-upload-client';
import { Ionicons } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper'
import Constants from 'expo-constants'
import { tokenVar } from '../store/makeVar'
import { Divider } from 'react-native-elements'

const EditRecipe = ({ navigation, route }) => {
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
        token: tokenVar()
      }
    },
    variables: {
      id: recipeId
    }
  })

  const [updateRecipe] = useMutation(EDIT_RECIPE, {
    context: {
      headers: {
        token: tokenVar()
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
          <Ionicons style={styles.cameraIcon} name='camera' />
          <Button mode="contained" labelStyle={styles.buttonStyle} style={{ backgroundColor: '#dcdde1' }} onPress={pickImage}>Take a Photo</Button>
        </View>
      )
    } else if (image) {
      return (
        <View style={styles.camera}>
          <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
          <Button mode="contained" labelStyle={styles.buttonStyle} style={{ backgroundColor: '#dcdde1' }} onPress={pickImage}>Change Photo</Button>
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
      <ScrollView>
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={30} color="black" onPress={() => navigation.navigate('Home')} />
          <Text style={styles.title}>Edit Recipe</Text>
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
          <Button mode="contained" style={styles.submitButtonStyle} onPress={editRecipe}>Add Recipe</Button>
        </View>
      </ScrollView>
    </View >
  )
}

export default EditRecipe

const styles = StyleSheet.create({
  submitButtonStyle: {
    backgroundColor: '#FF9494',
    margin: 20
  },
  inputForm: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  header: {
    alignItems: 'center',
    padding: 15,
    flexDirection: 'row'
  },
  formBox: {
    marginTop: 15
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
    justifyContent: 'flex-start',
    backgroundColor: '#FFF'

  },
  textStyle: {
    color: 'black',
    alignSelf: 'center',
    margin: 20,
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
    fontSize: 30,
  },
  buttonStyle: {
    fontSize: 10,
    color: 'black'
  }
})