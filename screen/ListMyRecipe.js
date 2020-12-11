import React from 'react'
import { View, Text } from 'react-native'
import Header from "../components/header"
import Recipe from "../components/RecipeItem"

export default function ListMyRecipe() {
    return (
        <View>
            <Header />
            <Recipe />
            <Recipe />
        </View>
    )
}
