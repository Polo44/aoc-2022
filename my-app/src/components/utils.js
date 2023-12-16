import { zip } from "lodash"

const checkLinesDiff = (line, lineToCompare) => {
    return line.split('').reduce((acc, col, c) => col !== lineToCompare.split('')[c] ? [...acc, c] : acc, [])
}

const transpose = (matrix) => {
    return zip(...matrix)
}

export {
    checkLinesDiff, transpose
}
