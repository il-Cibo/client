import { gql } from '@apollo/client'

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
	query findUserPlan {
		findPlan {
			id
			name
			Recipes {
				id
				title
				ingredients
				description
				image
				serving
				step
				time
				 UserRecipe {
						plan
						RecipeId
						UserId
						favorites
					}
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
			Tags {
				name
			}
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
			Tags {
				name
			}
			UserRecipe {
				UserId
			}
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
			image
			ingredients
			step
			serving
			time
		}
	}
`

export const DELETE_RECIPE = gql`
	mutation DeleteRecipe($id: Int!) {
		deleteRecipe(id: $id) {
			message
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

export const REMOVE_FROM_PLAN = gql `
	mutation removeFromPlan($id: Int!, $plan: String!) {
		removePlan (id: $id, plan: $plan) {
			plan
		}
	}
`

export const ADD_TO_PLAN = gql `
	mutation addToPlan($id: Int!, $plan: String!) {
		addToPlan (id: $id, plan: $plan) {
			plan
		}
	}
`

export const QUERY_SEARCH_RECIPE = gql`
  query searchRecipe($query: String!) {
    queryRecipes(query: $query) {
      id
      title
      description
      image
      ingredients
      step
      serving
      time
      Tags { name }
      UserRecipe { favorites plan }
    }
  }  
`

