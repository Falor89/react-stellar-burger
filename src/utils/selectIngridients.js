
const selectIngridients = (type, arr) => {
    return arr.reduce((acc, item) => {
        if (item.type === type) {
            acc.push(item);
        }
        return acc;
    }, []);
};

export default selectIngridients;

