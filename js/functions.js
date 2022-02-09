

export const copyObject = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

export const randomIntBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}