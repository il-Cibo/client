import React, { useState, useEffect } from 'react'
import {
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import { Octicons } from '@expo/vector-icons'
import moment from 'moment-timezone'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQuery } from '@apollo/client'
import { ADD_TO_PLAN, GET_MEALPLAN } from '../../config/queries'

const ModalAddPlan = ({ recipe, isVisible, onClose }) => {
  const [date, setDate] = useState(new Date());
  const [dayNow, setDayNow] = useState()
  
  const [addToPlan] = useMutation(ADD_TO_PLAN, {
    refetchQueries: [
      { query: GET_MEALPLAN }
    ]
  })

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const dayNow = moment(date).tz('Asia/Jakarta').format('dddd Do MMMM, YYYY')
    setDayNow(dayNow)
  }, [])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const dayNow = moment(currentDate).tz('Asia/Jakarta').format('dddd Do MMMM, YYYY')
    setDayNow(dayNow)
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const addNewPlan = () => {
    const plan = moment(date).tz('Asia/Jakarta').format('YYYY-MM-DD')

    addToPlan({
      variables: {
        id: recipe.id,
        plan: plan
      }
    })
    onClose()
  }
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}

    >
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{recipe.title}</Text>

        <View style={styles.selectDate}>
          <View>
          </View>
          <View style={styles.dateContainer}>
            <Octicons style={styles.calendarIcon} name="clock" size={24} color="black" />
            <Text style={styles.dateNow}>{dayNow}</Text>
          </View>
          <View style={styles.pickCalendar}>
            <Octicons name="calendar" size={40} color="black" onPress={showDatepicker} />
            <Text style={{fontWeight: 'bold'}}>Choose Date</Text>
          </View>
        </View>

        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View style={styles.modalButton}>
          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#1289A7" }}
            onPress={() => {
              addNewPlan()
            }}
          >
            <Text style={styles.textStyle}>Save</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={{ ...styles.openButton, backgroundColor: "#f6b93b" }}
            onPress={() => {
              onClose()
            }}
          >
            <Text style={styles.textStyle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </View>

    </View>
  </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 24
  },
  selectDate: {
    justifyContent: 'space-between',
  },
  calendarIcon: {
    fontSize: 25,
    color: '#f1f2f6'
  },
  modalButton: {
    justifyContent: 'space-between',
    direction: 'inherit',
    flexDirection: 'row',
    width: 230
  },
  dateNow: {
    fontSize: 14,
    fontWeight: 'bold',
    alignContent: 'center',
    color: '#f1f2f6',
    letterSpacing: 0.5
  },
  dateContainer: {
    backgroundColor: '#596275',
    justifyContent: 'space-between',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    width: 300
  },
  pickCalendar: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  }
});

export default ModalAddPlan