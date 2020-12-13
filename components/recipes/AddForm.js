import React, { useState } from 'react';
import { Dimensions, View, TextInput, StyleSheet } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const AddForm = ({labelValue, placeholderText, iconType, ...rest}) => {
  const [inputContainer, setStyle] = useState({
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'  ,
    backgroundColor: '#fff',
  })

  const updateSize = (height) => {
    setStyle({
      ...inputContainer,
      height: height
    })
  }

  return (
    <View style={inputContainer}>
      <TextInput
        value={labelValue}
        style={styles.input}
        multiline={true}
        onContentSizeChange={(e) => updateSize(e.nativeEvent.contentSize.height)}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </View>
  );
};

export default AddForm;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    height: windowHeight / 15,
    borderColor: '#ccc',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
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
    padding: 10,
    flex: 1,
    fontSize: 10,
    color: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
