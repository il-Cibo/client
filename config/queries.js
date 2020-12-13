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

//Users Queries
export const LOGIN_USER = gql`
	query LoginUser($user: Login) {
		login(user: $user) {
			token
		}
	}
`
