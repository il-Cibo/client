import { gql } from '@apollo/client'

// export const GET_PROFILE = gql `
//   query getUserProfile {
//     user {
//       username
//       email
//       gender
//       name
// 			avatar,
// 			Recipes {
// 				id
// 				title
// 				image
// 			}
// 		}
//   }
// `

export const GET_PROFILE = gql`
  query getUserProfile {
    user {
      username
      email
      gender
      name
			avatar,
			Recipes {
				id
				title
				image
				serving
				time
				ingredients
				step
				Tags {
					name
				}
			}
		}
  }
`

// masih gak yakin sama querynya
export const GET_MEALPLAN = gql`
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
		user {
			id
			username
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

export const UPLOAD_RECIPE = gql`
	mutation addNewRecipe ($recipe: NewRecipe, $tags: [String!]) {
		addRecipe (recipe: $recipe, tags: $tags) {
			id
		}
	}
`

export const EDIT_RECIPE = gql` 
	mutation EditRecipe($id: Int!, $recipe: NewRecipe, $tags: [String!]) {
		editRecipe (id: $id, recipe: $recipe, tags: $tags) {
			id
			title
			description
			ingredients
			step
			serving
			time
			Tags
		}
	}
`

export const DELETE_RECIPE = gql`
	mutation DeleteRecipe($id: Int!) {
		deleteRecipe(id: $id)
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
