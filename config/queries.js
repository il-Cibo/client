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

export const GET_PROFILE = gql `
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

export const UPLOAD_RECIPE = gql `
	mutation addNewRecipe ($recipe: NewRecipe, $tags: [String!]) {
		addRecipe (recipe: $recipe, tags: $tags) {
			id
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

//Users Queries
export const LOGIN_USER = gql`
	query LoginUser($user: Login!) {
		login(user: $user) {
			token
		}
	}
`
export const REGISTER_USER = gql`
	mutation Register ($user : Register!) {
		register(user: $user){
			username
		}
	}
`;
//====== ini ====
export const ADD_TO_FAVORITE_RECIPE = gql`
	mutation userRecipe ($favRecipe : User) {
		register(findFav: $favRecipe){
			UserId
			RecipeId
		}
	}
`;

export const DELETE_RECIPE_FAV = gql`
	mutation userRecipe ($id: Int!) {
		deleteFav(id: $id){
			fa
		}
	}
`;

export const LIST_FAV_USER_RECIPE = gql`
	query ListFavorit($id: String) {
		movieInfo(id: $id) {
			title
			overview
			poster_path
			genres
			release_date
			vote_average
			runtime
			production_companies
		}
	}
`;
