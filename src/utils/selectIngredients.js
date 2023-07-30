const selectIngredients = (type, arr) => {
    return arr.reduce((a, b) => {
        if (b.type === type) {
            a.push(b);
        }
        return a;
    },
        []
    );
};

export { selectIngredients }