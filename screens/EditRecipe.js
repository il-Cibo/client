import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, ScrollView } from 'react-native';
import { AddForm } from '../components'
import { EDIT_RECIPE } from '../config/queries'
import { useMutation } from '@apollo/client'

const EditRecipe = ({ data }) => {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbWFuZGFqZWhhbiIsImlhdCI6MTYwNzkyNjM1N30.ei4NpaGVR8b6kkP5DwYJUrlZuCZjdxdTorX0iP6eEik"
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [serving, setServing] = useState()
  const [cookingTime, setCookingTime] = useState()
  const [ingredients, setIngredients] = useState()
  const [cookingSteps, setCookingSteps] = useState()
  const [tags, setTags] = useState()
  const [updateRecipe] = useMutation(EDIT_RECIPE, {
    context: {
      headers: {
        token: token
      }
    }
  })
  const editRecipe = () => {
    const recipe = {
      title: title,
      description: description,
      ingredients: ingredients.split('\n'),
      serving: +serving,
      time: +cookingTime,
      step: cookingSteps.split('\n')
    }

    console.log(recipe);

    const tagData = tags.split('\n')

    updateRecipe({
      variables: {
        id: data.id,
        recipe: recipe,
        tags: tagData
      }
    })
  }

  return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Edit Recipe Title</Text>
        </View>
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
            <Button title='Save' style={styles.submit} onPress={editRecipe} />
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
    backgroundColor: 'pink'
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
    paddingTop: 20,
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