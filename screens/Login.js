import React, { useContext, useState, useEffect } from 'react';
import { FormInput, SocialButton, Loading } from '../components'
import { useLazyQuery } from '@apollo/client'
import { LOGIN_USER } from '../config/queries'
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	ScrollView
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setToken } from '../store'
import { Button } from 'react-native-paper'

const Login = ({ navigation }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch()
	const [getToken, { loading, error, data }] = useLazyQuery(LOGIN_USER, {
		context: {
			headers: {}
		},
		onCompleted: ((data) => {
			dispatch(setToken(data.login.token))
			navigation.navigate('Home')
		})
	})

	// const storeData = async (value) => {
	// 	try {
	// 		await AsyncStorage.setItem('token', value)
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// }

	// if (data) {
	// 	storeData(data.login.token)
	// 		.then(res => {
	// 			console.log(res);
	// 		})
	// 		.catch(err => {
	// 			console.log(err);
	// 		})
	// 	// console.log(data);
	// 	// const storeData = async (data) => {
	// 	// 	try {
	// 	// 		await AsyncStorage.setItem('token', data)
	// 	// 	} catch (e) {
	// 	// 		console.log(e);
	// 	// 	}
	// 	// }
	// 	// await storeData(data.login.token)
	// 	// AsyncStorage.setItem('token', data.login.token)
	// 	// localStorage.setItem('token', data.login.token)
	// 	navigation.navigate('Home')
	// 	return <Text>Loading ...</Text>
	// 	// return <Loading />
	// }

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

	function login(username, password) {
		getToken({
			variables: {
				user: {
					username,
					password
				}
			}
		})
	}

	return (
		// <ImageBackground source={require('../assets/foad-roshan-9JbvVFJ1eLk-unsplash.jpg')}>
		<View style={styles.container}>
			<Text style={styles.title}>Mealo</Text>
			<Text style={styles.h2}>Please login to continue</Text>
			<Image
				source={require('../assets/login.png')}
				style={styles.logo}
			/>

			<FormInput
				labelValue={username}
				onChangeText={(inputUsername) => setUsername(inputUsername)}
				placeholderText="Username"
				iconType="user"
				keyboardType="default"
				autoCapitalize="none"
				autoCorrect={false}
			/>

			<FormInput
				labelValue={password}
				onChangeText={(userPassword) => setPassword(userPassword)}
				placeholderText="Password"
				iconType="lock"
				secureTextEntry={true}
			/>

			<Button
				mode="contained"
				color="#FF9494"
				labelStyle={styles.buttonStyle}
				style={{width: 300, borderRadius: 15, marginTop: 30}}
				onPress={() => login(username, password)}
			>
				Login
			</Button>

			{/* <TouchableOpacity style={styles.forgotButton} >
				<Text style={styles.navButtonText}>Forgot Password? </Text>
			</TouchableOpacity> */}

			<View>
				
				<SocialButton
					buttonTitle="Sign in with Google"
					btnType="google"
					color="#de4d41"
					backgroundColor="#f5e7ea"
				/>
			</View>
			<TouchableOpacity
				style={styles.forgotButton}
				onPress={() => navigation.navigate('Register')}>
				<Text style={styles.navButtonText}>
				{"\n"}Don't have an acount? Create here!
                 </Text>
			</TouchableOpacity>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFF',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		paddingTop: 10,
	},
	title: {
		fontFamily: 'Oswald',
		fontSize: 40,
		marginBottom: 10,
		color: 'black',
		alignSelf: 'flex-start',
		marginLeft: 20
	},
	h2: {
		color: '#bdc3c7',
		alignSelf: 'flex-start',
		marginLeft: 20,
		fontFamily: 'Oswald',
	},
	logo: {
		alignSelf: 'flex-end',
		height: 250,
		width: 250,
		resizeMode: 'cover',
	},
	navButton: {
		marginTop: 15,
	},
	navButtonText: {
		fontSize: 14,
		fontWeight: '500',
		color: '#FF9494',
		fontFamily: 'Oswald',
	},
	textPrivate: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginVertical: 35,
		justifyContent: 'center',
	},
	buttonStyle: {
		color: '#EEE6E6',
		letterSpacing: 3,
		fontWeight: 'bold',
		fontSize: 16,
		fontFamily: 'Oswald'
	}
});

