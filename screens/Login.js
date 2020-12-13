import React, { useContext, useState, useEffect } from 'react';
import { FormInput, FormButton, SocialButton, Loading } from '../components'
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

	console.log(data);
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
			<Text style={styles.text}>Mealo App </Text>
			<Text>Please login to continue</Text>
			<Image
				source={require('../assets/three-female-friends-sitting-cafe-lunch-talking_74855-5295.jpg')}
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

			<FormButton
				buttonTitle="Login"
				onPress={() => login(username, password)}
			/>

			<TouchableOpacity style={styles.forgotButton} >
				<Text style={styles.navButtonText}>Forgot Password? {"\n"}</Text>
			</TouchableOpacity>

			<View>
				<SocialButton
					buttonTitle="Sign In with Google"
					btnType="google"
					color="#de4d41"
					backgroundColor="#f5e7ea"
				/>
			</View>
			<TouchableOpacity
				style={styles.forgotButton}
				onPress={() => navigation.navigate('Register')}>
				<Text style={styles.navButtonText}>
					Don't have an acount? Create here
        </Text>
			</TouchableOpacity>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#f9fafd',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		paddingTop: 5,
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
});

