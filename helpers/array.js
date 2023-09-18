const array = {
    arrToChunks(arr = [], chuksSize = 10) {
        return Array.from({ length: Math.ceil(arr.length / chuksSize) }, (_, i) => arr.slice(i * chuksSize, i * chuksSize + chuksSize));
    }
}

export default array