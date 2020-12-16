import React, { useState } from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper'
const windowHeight = Dimensions.get('window').height;

const AddForm = ({labelValue, placeholderText, iconType, ...rest}) => {
  // const [inputContainer, setStyle] = useState({
  //   marginTop: 5,
  //   marginBottom: 10,
  //   width: '100%',
  //   height: windowHeight / 15,
  //   borderColor: '#ccc',
  //   borderRadius: 3,
  //   borderWidth: 1,
  //   flexDirection: 'row',
  //   alignItems: 'center'  ,
  //   backgroundColor: '#fff',
  // })

  const updateSize = (height) => {
    setStyle({
      ...inputContainer,
      height: height
    })
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        value={labelValue}
        label={labelValue}
        mode="flat"
        // style={styles.input}
        // multiline={true}
        // mode='outlined'
        // onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
        // placeholder={placeholderText}
        // placeholderTextColor="#666"
        // {...rest}
      />
    </View>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  inputContainer: {
    flex:1
    // marginTop: 5,
    // marginBottom: 10,
    // width: '100%',
    // height: windowHeight / 15,
    // borderColor: '#ccc',
    // borderRadius: 3,
    // borderWidth: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: '#fff',
  },
  iconStyle: {
    padding: 10,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: 50,
  },
  input: {
    padding: 5,
    margin: 20,
    flex: 1,
    fontSize: 10,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
