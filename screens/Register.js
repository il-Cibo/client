import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Platform, StyleSheet, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../config/queries'
import { RadioButton } from 'react-native-paper'
import { AuthContext } from '../navigation/AuthProvider.android';

const register = ({ navigation }) => {
    const { login, googleLogin, fbLogin } = useContext(AuthContext);

    const [newUser, { data, error, loading }] = useMutation(REGISTER_USER)
    // console.log(data)
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [gender, setGender] = useState('');
    const [avatar, setAvatar] = useState('');
    const [addUser, setAddUser] = useState({
        username: '',
        email: '',
        password: '',
        gender: '',
        name: '',
        avatar: ''
    })

    const onsubmit = (event) => {
        event.preventDefault()

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
    }

    return (

        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <Image
                source={require('../assets/three-female-friends-sitting-cafe-lunch-talking_74855-5295.jpg')}
                style={styles.logo}
            />
            <ScrollView>
                <FormInput
                    name="username"
                    value={userName}
                    onChangeText={(userName) => setUserName(userName)}
                    placeholderText="username"
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
                    placeholderText="email"
                    iconType="mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <FormInput
                    name="password"
                    labelValue={password}
                    onChangeText={(userPassword) => setPassword(userPassword)}
                    placeholderText="password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                <FormInput
                    name="avatar"
                    labelValue={avatar}
                    onChangeText={(userAvatar) => setAvatar(userAvatar)}
                    placeholderText="avatar"
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
                <ListItem>
                    <CheckBox 
                    checked={gender === 'Male' ? true : false} 
                    onPress={() => setGender('Male')}/>
                    <Body>
                        <Text>Male</Text>
                    </Body>
                    <CheckBox 
                    checked={gender === 'Female' ? true : false} 
                    onPress={() => setGender('Female')}/>
                    <Body>
                        <Text>Female</Text>
                    </Body>
                </ListItem>

                <FormButton
                    buttonTitle="register"
                    onPress={onsubmit}
                    onPress={() => navigation.navigate('Register')}
                />

                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        By registering, you confirm that you accept our{' '}
                    </Text>
                    <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                        <Text style={[styles.color_textPrivate, { color: '#e88832' }]}> Terms of service </Text>
                    </TouchableOpacity>
                    <Text style={styles.color_textPrivate}> and </Text>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}> Privacy Policy </Text>
                </View>

                {Platform.OS === 'android' ? (
                    <View>
                        <SocialButton
                            buttonTitle="Sign Up with Google"
                            btnType="google"
                            color="#de4d41"
                            backgroundColor="#f5e7ea"
                        />
                    </View>
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
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        // fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
        marginTop: 50
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        width: 150,
        resizeMode: 'cover',
        marginTop: 15
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        color: 'grey',
    },
});


{/* <form onSubmit={onSubmit}>
    <input name="username" value={addUser.userName} onChange={onChange} placeholder="username" />
    <input name="gender" value={addUser.gender} onChange={onChange} placeholder="gender" />
    <input name="email" value={addUser.email} onChange={onChange} placeholder="mail" />
    <input name="password" value={addUser.password} onChange={onChange} placeholder="pass" />
    <input name="avatar" value={addUser.avatar} onChange={onChange} placeholder="avatar" />
    <input type="sumbit" value="register" />
</form> */}