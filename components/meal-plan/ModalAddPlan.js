import React, { useState, useEffect } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button
} from "react-native";
import { Octicons } from '@expo/vector-icons'
import moment from 'moment-timezone'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector } from 'react-redux'
import { useMutation } from '@apollo/client'
import { ADD_TO_PLAN, GET_MEALPLAN } from '../../config/queries'

const ModalAddPlan = ({ recipe }) => {
  // const token = useSelector((token) => state.token)
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJ0ZXN0bG9naW4iLCJpYXQiOjE2MDc4NjMzMzZ9.cAErNfgFsC2y9VAuO3xvAU1-KoB7k83-Vbf2CzL9muY"

  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [dayNow, setDayNow] = useState()

  const [addToPlan] = useMutation(ADD_TO_PLAN, {
    context: {
      headers: {
        token: token
      }
    }
  }, {
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
  }
  
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{recipe.title}</Text>
            
            <View style={styles.selectDate}>
              <View>
                <Octicons style={styles.calendarIcon} name="clock" size={24} color="black" />
              </View>
              <View>
                <Text style={{fontSize: 15, fontWeight: 'bold', alignContent: 'center'}}>{dayNow}</Text>
              </View>
              <View>
                <Octicons style={styles.calendarIcon} name="calendar" size={24} color="black" onPress={showDatepicker} />
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
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  addNewPlan()
                }}
              >
                <Text style={styles.textStyle}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
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
    margin: 20,
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
    elevation: 2
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
    flexDirection: 'row',
  },
  calendarIcon: {
    fontSize: 30
  },
  modalButton: {
    justifyContent: 'space-between',
    direction: 'inherit'
  }
});

export default ModalAddPlan