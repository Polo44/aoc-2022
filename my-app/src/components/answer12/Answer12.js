import { min } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import raw from './input.txt'

const Answer12 = () => {
    const [data, setData] = useState([])
    const [result, setResult] = useState(0)
    const [startX, setStartX] = useState(-1)
    const [startY, setStartY] = useState(-1)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const grid = text.split('\n').map(d => d.split(''))
                const x = grid.findIndex((line) => line.includes('S'))
                setStartX(x)
                setStartY(grid[x].findIndex((cell) => cell === 'S'))
                setData(grid.map(line => line.map(s => s !== 'S' ? s : 'a')))
            })
    }, [])

    const maxY = data?.[0]?.length - 1
    const maxX = data?.length
    let visited = []

    const fasterWay = (x, y, prevCell, depth) => {
        const cell = data[x][y].charCodeAt(0)
        const pointV = visited.find(d => d.x === x && d.y === y)
        if (prevCell === 122 && cell === 69) {
            return depth
        }
        if (!([0, 1].includes(cell - prevCell)) || (pointV && pointV.depth <= depth)) {
            return false
        }
        visited = pointV ? [...visited.filter(d => d.depth <= depth), { x, y, depth, cell: data[x][y] }] : [...visited, { x, y, depth, cell: data[x][y] }]
        return ((x + 1) < maxX && fasterWay(x + 1, y, cell, depth + 1))
            || ((y + 1) < maxY && fasterWay(x, y + 1, cell, depth + 1))
            || ((y - 1) >= 0 && fasterWay(x, y - 1, cell, depth + 1))
            || ((x - 1) >= 0 && fasterWay(x - 1, y, cell, depth + 1))
    }

    useEffect(() => {
        if (data.length && startX >= 0 && startY >= 0) {
            setResult(fasterWay(startX, startY, 97, 0))
        }
    }, [data, startX, startY])

    return (
        <div className="App">
            <div>
                {result}
            </div>
        </div>
    )
}

export default Answer12
