import React, { useContext, useState } from 'react';
import { View, Text,Image, TouchableOpacity, Platform, StyleSheet, ScrollView } from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

const register = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userName, setUserName] = useState();
    const [gender, setGender] = useState();
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>
            <Image
                source={require('../assets/three-female-friends-sitting-cafe-lunch-talking_74855-5295.jpg')}
                style={styles.logo}
            />
            <ScrollView>
            <FormInput
                labelValue={userName}
                onChangeText={(name) => setUserName(name)}
                placeholderText="Name"
                iconType="user"
                autoCapitalize="none"
            />
            <FormInput
                labelValue={gender}
                onChangeText={(userGender) => setGender(userGender)}
                placeholderText="Gender"
                iconType="man"
                autoCapitalize="none"
            />
            
            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="mail"
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true}
            />

            <FormButton
                buttonTitle="register"
                onPress={() => register(email, password)}
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
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        width: 150,
        resizeMode: 'cover',
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
