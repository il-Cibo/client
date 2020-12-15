import React, { useContext, useState } from 'react';
import { View, Text, Image, Form, Item, Spinner, TouchableOpacity, Platform, StyleSheet, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import { Button } from 'react-native-paper'
import SocialButton from '../components/SocialButton';
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../config/queries'
import { RadioButton } from 'react-native-paper'

const register = ({ navigation }) => {
  const [newUser, { data, error, loading }] = useMutation(REGISTER_USER)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [gender, setGender] = useState('');


  const onsubmit = (event) => {
    event.preventDefault()
    let avatar = ''


    if (gender === 'male') {
      avatar = 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png'
    } else if (gender === 'female') {
      avatar = 'https://toppng.com/uploads/preview/erson-icon-black-female-user-icon-11562985556wqtga6z7zf.png'
    } else {
      avatar = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face-thumbnail.png'
    }

    newUser({
      variables: {
        user: {
          username: userName,
          email: email,
          password: password,
          gender: gender,
          name: name,
          avatar: avatar
        }
      }
    })
    navigation.navigate('Login')
  }
  console.log(newUser)
  
  if (loading) {
    return <Text>Loading ...</Text>
    // return <Loading />
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>{error.message}</Text>
      </View>
    )
    // return <div>{error.message}</div>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an Account</Text>
      <Image
        source={require('../assets/register.png')}
        style={styles.logo}
      />
      <ScrollView>
        <FormInput
          name="username"
          value={userName}
          onChangeText={(userName) => setUserName(userName)}
          placeholderText="Username"
          iconType="user"
          autoCapitalize="none"
        />
        <FormInput
          name="name"
          labelValue={name}
          onChangeText={(userfullName) => setName(userfullName)}
          placeholderText="Full Name"
          iconType="user"
          autoCapitalize="none"
        />

        <FormInput
          name="email"
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="E-mail"
          iconType="mail"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FormInput
          name="password"
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />
        <FormInput
          name="gender"
          labelValue={gender}
          onChangeText={(userGender) => setGender(userGender)}
          placeholderText="gender"
          iconType="user"
          secureTextEntry={true}
        />
        {/* <RadioButton
                    value="Male"
                    status={gender === 'Male' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('Male')}
                /> 
                <RadioButton
                    value="Female"
                    status={gender === 'Female' ? 'checked' : 'unchecked'}
                    onPress={() => setGender('Female')}
                /> */}
        {/* <Form>
                    <Picker
                        mode="dropdown"
                        placeholder="Select One"
                        placeholderStyle={{ color: "#2874F0" }}
                        note={false}
                        selectedValue={gender}
                        onValueChange={onValueChange}
                    >
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                        
                    </Picker>
                </Form> */}

        <Button
          mode="contained"
          color="#FF9494"
          labelStyle={styles.buttonStyle}
          style={{ width: 300, borderRadius: 15, marginTop: 30 }}
          onPress={onsubmit}
        >
          Create an account
			</Button>

        {Platform.OS === 'android' ? (
          <SocialButton
            buttonTitle="Sign Up with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
          />
        ) : null}

      </ScrollView>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Oswald',
    fontSize: 38,
    color: 'black',
    alignSelf: 'flex-end',
    textAlign: 'right',
    width: 160,
    marginRight: 15,
    marginBottom: 150,
    marginTop: 15
  },
  logo: {
    alignSelf: 'flex-start',
    marginTop: 90,
    height: 200,
    width: 200,
    resizeMode: 'cover',
    position: 'absolute',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FF9494',
    fontFamily: 'Oswald',
  },
  buttonStyle: {
    color: '#EEE6E6',
    letterSpacing: 1,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Oswald',

  }
});


{/* <form onSubmit={onSubmit}>
    <input name="username" value={addUser.userName} onChange={onChange} placeholder="username" />
    <input name="gender" value={addUser.gender} onChange={onChange} placeholder="gender" />
    <input name="email" value={addUser.email} onChange={onChange} placeholder="mail" />
    <input name="password" value={addUser.password} onChange={onChange} placeholder="pass" />
    <input name="avatar" value={addUser.avatar} onChange={onChange} placeholder="avatar" />
    <input type="sumbit" value="register" />
</form> */}