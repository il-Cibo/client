import { gql } from '@apollo/client'

export const GET_PROFILE = gql `
  query getUserProfile {
    user {
      username
      email
      gender
      name
      avatar
    }
  }
`

// export const GET_MEALPLAN = gql `
//   query getUserMealPlan {

//   }
// `