const selectType = (type, arr) => {
    return arr.reduce((a, b) => {
        if (b.type === type) {
            a.push(b)
        }
        return a;
    }, [])
}

export default selectType;