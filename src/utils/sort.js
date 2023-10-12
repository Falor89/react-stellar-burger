const sort = (list) => {
    const buns = [];
    const sauces = [];
    const main = [];
    buns.push(...list.filter((ingredient) => ingredient.type === "bun"));
    sauces.push(...list.filter((ingredient) => ingredient.type === "sauce"));
    main.push(...list.filter((ingredient) => ingredient.type === "main"));
    return [buns, sauces, main]
}

export default sort