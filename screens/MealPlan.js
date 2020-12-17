import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, SafeAreaView, Text, Platform, RefreshControl} from 'react-native'
import { Loading, MealPlanCard } from '../components'
import { GET_MEALPLAN } from '../config/queries'
import { useQuery } from '@apollo/client'
import moment from 'moment-timezone'
import { Octicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { tokenVar } from '../store/makeVar'

const wait = timeout => {
	return new Promise(resolve => {
		setTimeout(resolve, timeout);
	});
};

const MealPlan = () => {
  const [dateNow, setDateNow] = useState()
  const [dayNow, setDayNow] = useState()
  const [todayPlan, setTodayPlan] = useState([])
  const [formattedDate, setFormattedDate] = useState()
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const { loading, data, refetch } = useQuery(GET_MEALPLAN)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
		setRefreshing(true);
		refetch()
		wait(500).then(() => setRefreshing(false));
  }, []);
  
  useEffect(() => {
    refetch()
    const date = new Date ()
    setDateNow(date)

    const newDate = moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD')
    setFormattedDate(newDate)

    const dayNow = moment(date).tz('Asia/Jakarta').format('dddd Do MMMM, YYYY')
    setDayNow(dayNow)

    if(data) {
      const todayPlan = data.findPlan.Recipes.filter(el => {
        return el.UserRecipe.plan.indexOf(newDate) > -1
      })
      
      setTodayPlan(todayPlan)
    }
  }, [data])
  
  const onChange = (event, selectedDate) => {
    refetch()
    const currentDate = selectedDate;

    const dayNow = moment(currentDate).tz('Asia/Jakarta').format('dddd Do MMMM, YYYY')
    setDayNow(dayNow)
    const formattedDate = moment(currentDate).tz('Asia/Jakarta').format('YYYY-MM-DD')

    const todayPlan = data.findPlan.Recipes.filter(el => {
      return el.UserRecipe.plan.indexOf(formattedDate) > -1
    })

    setTodayPlan(todayPlan)
    setShow(Platform.OS === 'ios');
    setDateNow(currentDate);
    setFormattedDate(formattedDate)
  };
  
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const renderMealPlanCard = () => {
    if(!todayPlan || todayPlan.length === 0) {
      return (
        <View style={style.planBody}>
          <Text>You have no meal planned for today.</Text>
        </View>
      )
    }

    return (
      <View>
        {
          todayPlan.map(recipe => {
            return (
              <MealPlanCard key={recipe.id} recipe={recipe} currentDate={formattedDate} refetch={refetch} />
            )
          })
        }
      </View>
    )
  }

  if(loading) {
    return <Loading/>
  }
  
  return (
    <SafeAreaView>
      <View style={style.calendarHeader}>
      </View>

      <View style={style.dateContainer}>
          <View style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 30,
            paddingRight: 30
          }}>
            <Text style={style.headerText}>Meal Plan</Text>
            <Octicons style={style.calendarIcon} name="calendar" size={24} color="black" onPress={showDatepicker} />
          </View>
        <Text style={style.currentDate}>{dayNow}</Text>
      </View>
        {show && (
          <DateTimePicker
            value={dateNow}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

      <ScrollView style={style.planBody}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {renderMealPlanCard()}
      </ScrollView>
    </SafeAreaView>
  )
}

export default MealPlan

const style = StyleSheet.create({
  calendarHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold'
  },  
  planBody: {
    paddingTop: 30,
    padding: 15
  },
  calendarIcon: {
    fontSize: 30
  },
  dateContainer: {
    paddingLeft: 30
  },
  currentDate: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})