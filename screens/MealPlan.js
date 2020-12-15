import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native'
import { MealPlanCard } from '../components'
import { GET_MEALPLAN } from '../config/queries'
import { useQuery } from '@apollo/client'
import moment from 'moment'
import CalendarStrip from 'react-native-calendar-strip';



const MealPlan = () => {
  const [dateNow, setDateNow] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [allPlans, setAllPlans] = useState([])
  const [todayPlan, setTodayPlan] = useState([])
  // const { loading, error, data } = useQuery(GET_MEALPLAN)
  const data = [
    {
      id: 1,
      UserId: 3, 
      RecipeId: 1,
      date: '2020-12-16',
      Recipes: {
        "id": 1,
        "description": "Enak dan bergizi",
        "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/1f2dae88-cb8d-4837-b798-74fe04657b34.png",
        "ingredients": [
          "ayam 1 ekor",
          "tepung 200g"
        ],
        "title": "Mie Ayam Goreng"
      },
    },
    {
      id: 2,
      UserId: 3, 
      RecipeId: 1,
      date: '2020-12-16',
      Recipes: {
        "id": 8,
        "description": "Enak dan bergizi",
        "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/ade93cb8-2f21-480d-a818-991d2839f4e9.jpg",
        "ingredients": [
          "ayam 1 ekor",
          "tepung 200g"
        ],
        "title": "Cek log args.recipe.image"
      }
    },
    {
      id: 3,
      UserId: 3, 
      RecipeId: 1,
      date: '2020-12-17',
      Recipes: {
        "id": 6,
        "description": "Enak dan bergizi",
        "image": "https://mealo-image.s3.ap-southeast-1.amazonaws.com/0ed4b29e-6efd-4ae9-a2b0-3518ac3ab1a7.jpg",
        "ingredients": [
          "ayam 1 ekor",
          "tepung 200g"
        ],
        "title": "Cek log args.recipe.image"
      }
    }
  ]

  useEffect(() => {
    const date = new Date ()
    setDateNow(date)
    const newDate = moment(date).format('YYYY-MM-DD')
    const todayRecipe = data.filter(el => el.date === newDate)
    console.log(todayRecipe);
    console.log(todayPlan);
    // setTodayPlan(todayRecipe)
  }, [])

  const getTodayRecipe = (value) => {
    const newDate = moment(value).format('YYYY-MM-DD')
    const todayRecipe = data.filter(el => el.date === newDate)
    console.log(todayRecipe);
    console.log(newDate);
    // setTodayPlan(todayRecipe)
  }
  
  const renderMealPlanCard = () => {
    if(!todayPlan || todayPlan.length === 0) {
      return (
        <View style={style.planBody}>
          <Text>You have no meal planned today.</Text>
        </View>
      )
    }
    
    // Bener gak return nya gini kalo ada plan nya
    todayPlan.map(plan => {
      return (
        <MealPlanCard key={plan.id} recipe={plan.Recipes} />
      )
    })
  }

  return (
    <SafeAreaView>
      <View style={style.calendarHeader}>
        <CalendarStrip
          style={{height:150, paddingTop: 20, paddingBottom: 10}} 
          scrollable
          startingDate={dateNow}
          onDateSelected={(date) => getTodayRecipe(date)}
        />
      </View>

      <ScrollView style={style.planBody}>
        {/* {renderMealPlanCard()} */}
        {/* {
          todayPlan.recipe.map((recipe) => {
            <MealPlanCard key={recipe.id} recipe={recipe} />
          })
        } */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default MealPlan

const style = StyleSheet.create({
  calendarHeader: {
    paddingTop: 100,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center'
  },

  planBody: {
    paddingTop: 50
  }
})