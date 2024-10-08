import { Category } from "../category.entity"
import { Person } from "../person.entity"

export interface IBlog {    
    id?: number
    title: string
    description: string
    person: Person  
    category: Category  
    creation_date?: Date
    update_date: Date    
}