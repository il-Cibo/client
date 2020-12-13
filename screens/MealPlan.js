import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from 'react-native'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CalendarStrip from 'react-native-calendar-strip';
// import CalendarStrip from 'react-native-slideable-calendar-strip';
import { RecipeCard } from '../components'

const MealPlan = () => {
  const [dateNow, setDateNow] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [recipes, setRecipes] = useState()

  useEffect(() => {
    const date = new Date ()
    console.log(date);
    setDateNow(date)
  }, [])

  const test = (date) => {
    console.log(date);
    setSelectedDate(date)
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
          onDateSelected={(date) => test(date)}
          selectedDate={selectedDate}
        />
      </View>

      <ScrollView style={style.planBody}>
        <RecipeCard recipe={recipe} />
        <RecipeCard recipe={recipe} />
        <RecipeCard recipe={recipe} />
        <RecipeCard recipe={recipe} />
        <RecipeCard recipe={recipe} />
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