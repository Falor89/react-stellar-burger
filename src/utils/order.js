export const getIngridients = (order, allIngredients) => {
    const list = order.ingredients.map((ingredient) => allIngredients.find(item => item._id === ingredient));
    const bun = list.find((ingredient) => ingredient?.type === 'bun');
    const ingredientsList = bun ? [bun] : [];
    ingredientsList.push(...list.filter((ingredient) => ingredient?.type === 'sauce' || ingredient?.type === 'main'))
    const sum = ingredientsList.reduce((prev, ingredient) => prev + ingredient.price, bun ? bun.price : 0)
    return {
        sum: sum,
        ingredientsList: ingredientsList
    }
}
