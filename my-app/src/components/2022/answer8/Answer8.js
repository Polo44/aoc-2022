import { max } from "lodash";
import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer8 = () => {
    const [data, setData] = useState([])
    const [xLength, setXLength] = useState(0)
    const [yLength, setYLength] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => d.split('').map(d2 => parseInt(d2))))
                setYLength(text.replaceAll('\r', '').split('\n')[0].length)
                setXLength(text.replaceAll('\r', '').split('\n').length)
            })
    }, [])

    const left = (x, y, compare, depth, isDepth) => x < 0 ? (isDepth ? (depth - 1) : 1) : compare <= data[x][y] ? (isDepth ? depth : 0) : left(x - 1, y, compare, depth + 1, isDepth)
    const right = (x, y, compare, depth, isDepth) => x >= xLength ? (isDepth ? (depth - 1) : 1) : compare <= data[x][y] ? (isDepth ? depth : 0) : right(x + 1, y, compare, depth + 1, isDepth)
    const top = (x, y, compare, depth, isDepth) => y < 0 ? (isDepth ? (depth - 1) : 1) : compare <= data[x][y] ? (isDepth ? depth : 0) : top(x, y - 1, compare, depth + 1, isDepth)
    const bottom = (x, y, compare, depth, isDepth) => y >= yLength ? (isDepth ? (depth - 1) : 1) : compare <= data[x][y] ? (isDepth ? depth : 0) : bottom(x, y + 1, compare, depth + 1, isDepth)

    const result1 = data.length && data.reduce((acc, line, x) => acc + line.reduce((acc2, compare, y) => {
        return acc2 + max([left(x - 1, y, compare, 0, false), right(x + 1, y, compare, 0, false), top(x, y - 1, compare, 0, false), bottom(x, y + 1, compare, 0, false)])
    }, 0), 0)

    const result2 = data.length && data.reduce((acc, line, x) => max([acc, line.reduce((acc2, compare, y) => {
        return max([acc2, left(x - 1, y, compare, 1, true) * right(x + 1, y, compare, 1, true) * top(x, y - 1, compare, 1, true) * bottom(x, y + 1, compare, 1, true)])
    }, 0)]), 0)

    return (
        <div className="App">
            <div>
                {result1}
            </div>
            <div>
                {result2}
            </div>
        </div>
    )
}

export default Answer8
