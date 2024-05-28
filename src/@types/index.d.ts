/* Types for diet */
type MealItem = {
  name: string
  description: string | null
  quantity: number
  unit: string
}

type MealItemCreateInput = {
  name: string
  description?: string
  quantity: number
  unit: string
}

type Meal = {
  title: string
  items: MealItem[]
  completed: Date | null
}

type MealCreateInput = {
  title: string
  items: MealItem[]
  completed?: Date
}

export type Diet = {
  id: string
  title: string
  meals: Meal[]
  author_id: string
  author_name: string
  orientations: string[] | null
}

/* Types for user */
export type User = {
  id: string
  name: string
  email: string
  password_hash: string
  crn: string | null
  image_url: string | null
  diet: Diet | null
  days_in_offensive: number
}

/* Type for CRN Scraper */

export type Nutricionist = {
  name: string | null
  subscription: number | null
  crn: string | null
  situation: string | null
  subscriptionType: string | null
  lastUpdated: string | null
}

/* Types for create instances */
export type DietCreateInput = {
  title: string
  meals: Meal[]
  author_id: string
  author_name: string
}

export type UserCreateInput = {
  id?: string | undefined
  name: string
  email: string
  password_hash: string
  crn?: string | null
  image_url?: string | null
}
