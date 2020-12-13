import { gql } from '@apollo/client'

export const GET_PROFILE = gql `
  query getUserProfile {
    user {
      username
      email
      gender
      name
			avatar,
			Recipes
    }
  }
`

// masih gak yakin sama querynya
export const GET_MEALPLAN = gql `
  query getUserMealPlan {
		findPlan {
			User {
				Recipes
			}
		}
  }
`

//Recipes Queries
export const GET_ALL_RECIPES = gql`
	query GetRecipes {
		recipes {
			id
			title
			description
			image
			ingredients
			step
			serving
			time
		}
	}
`

export const GET_RECIPE = gql`
	query GetRecipe($id: Int!) {
		recipe(id: $id) {
			id
			title
			description
			image
			ingredients
			step
			serving
			time
		}
	}
`

export const ADD_RECIPE = gql`
	mutation addRecipe($recipe: NewRecipe, $tags: [String!]) {
		addRecipe(recipe: $recipe, tags: $tags)
	}
`

//Users Queries
export const LOGIN_USER = gql`
	query LoginUser($user: Login) {
		login(user: $user) {
			token
		}
	}
`

export const REGISTER_USER = gql`
	mutation Register ($user : Register) {
		register(user: $user){
			username
		}
	}
`;
