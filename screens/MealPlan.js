import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native'
import CalendarStrip from 'react-native-calendar-strip';
import { MealPlanCard } from '../components'
import { GET_MEALPLAN } from '../config/queries'
import { useQuery } from '@apollo/client'
import moment from 'moment'

const MealPlan = () => {
  const [dateNow, setDateNow] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [allPlans, setAllPlans] = useState()
  const [todayPlan, setTodayPlan] = useState()
  // const { loading, error, data } = useQuery(GET_MEALPLAN)

  useEffect(() => {
    const date = new Date ()
    setDateNow(date)
    // setAllPlans(data)
    // const today = allPlans.filter(el => el.date === date)
    // setTodayPlan(today)
  }, [])

  const getTodayRecipe = (value) => {
    const newDate = moment(value).format('YYYY-MM-DD')
    console.log(newDate);
    // setSelectedDate(date)
    // const todayRecipe = allPlans.filter(el => el.date === selectedDate)
    // setTodayPlan(todayRecipe)
  }

  const recipe = {
    title: 'Ini judul makanan',
    description: 'Ini description',
    serving: '2',
    time: '3',
  }

  return (
    <SafeAreaView>
      <View style={style.calendarHeader}>
        {/* <Text>INI MEAL PLAN</Text> */}
        <CalendarStrip
          style={{height:150, paddingTop: 20, paddingBottom: 10}} 
          scrollable={true}
          startingDate={dateNow}
          onDateSelected={(date) => getTodayRecipe(date)}
          // selectedDate={dateNow}
        />
      </View>

      {/* <ScrollView style={style.planBody}>
        {
          todayPlan.recipe.map((recipe) => {
            <MealPlanCard key={recipe.id} recipe={recipe} />
          })
        }
      </ScrollView> */}
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