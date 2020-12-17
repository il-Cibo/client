import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Card } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler';

function RecipeSmallCard({ recipe, navigation }) {
	const { image, title, serving, time, Tags } = recipe;
	
	function goToDetailsRecipe (recipe) {
		navigation.navigate('DetailRecipe', {
			recipeData: recipe,
			page: 'home'
		})
	}
	
	return (
		<TouchableOpacity onPress={() => goToDetailsRecipe(recipe)}>
			<Card containerStyle={{ borderColor: '#FFF' }}  >
			<View style={{ flexDirection: 'row' }}>
				<Card.Image
					source={{ uri: `${image}` }}
					style={{ width: 100, height: 100 }}
				/>
				<View style={styles.cardBody}>
					<View style={styles.cardHeader}>
						<View style={styles.userInfo}>
							<Image
								style={styles.userPic}
								source={require('../assets/woman.svg')}
							/>
							<Text style={styles.usernameStyle}>{recipe.Users[0].username}</Text>
						</View>
						<MaterialIcons name="keyboard-arrow-down" size={20} color="#747d8c" />
					</View>
					<View style={styles.recipeInfo}>
						<Text style={styles.recipeTitle}>{title}</Text>
						<View style={styles.cookInfo}>
							<View style={styles.row}>
								<MaterialCommunityIcons name="bowl-mix-outline" size={14} color="#747d8c" />
								<Text style={styles.info}>Serving: {serving}</Text>
							</View>
							<View style={styles.row}>
								<Ionicons name="timer-outline" size={14} color="#747d8c" />
								<Text style={styles.info}>Time Cook: {time} mins</Text>
							</View>
							<View style={styles.row}>
								<AntDesign name="tago" size={14} color="#747d8c" />
                {
                  Tags.map((tag, i) => <Text key={i} style={styles.info}>{tag.name}</Text>)
                }
							</View>
						</View>
					</View>
				</View>
			</View>
		</Card>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	cardBody: {
		marginLeft: 10,
		width: 200
	},
	cardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 20,
		width: '100%'
	},
	userInfo: {
		flexDirection: 'row',
		height: 20,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	userPic: {
		width: 20,
		height: 20,
		borderRadius: 50
	},
	row: {
		flexDirection: 'row',
		alignItems: 'baseline'
	},
	usernameStyle: {
		fontSize: 10,
		marginLeft: 0
	},
	recipeInfo: {
		marginTop: 5
	},
	recipeTitle: {
		fontSize: 12,
		fontWeight: 'bold'
	},
	cookInfo: {
		marginTop: 10,
		height: 50,
		justifyContent: 'space-evenly'
	},
	info: {
		color: "#747d8c",
		fontSize: 7,
		marginLeft: 5
	}
})

export default RecipeSmallCard
