import { TIngredient, TOrder } from "./types/data";

export const getIngridients = (order: TOrder, allIngredients: TIngredient[]) => {
    const list = order.ingredients.map((ingredient) => allIngredients.find(item => item._id === ingredient));
    const bun: TIngredient | undefined = list.find((ingredient) => ingredient?.type === 'bun');
    const ingredientsList: (TIngredient)[] = bun ? [bun] : [];
    list.forEach((ingredient) => {
        if (ingredient?.type === 'sauce' || ingredient?.type === 'main') {
            ingredientsList.push(ingredient)
        }
    })
    const sum: number = ingredientsList.reduce((prev, ingredient) => prev + ingredient.price, bun ? bun.price : 0)
    return {
        sum: sum,
        ingredientsList: ingredientsList
    }
}