import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { range, sum } from 'lodash'
import DayDisplay from '../../DayDisplay'

const Answer4 = () => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(line => line.split('')))
            });
    }, [])

    const getAllPossible = (x, y, dx, dy, depth, maxDepth) => {
        if (!data?.[x]?.[y]) {
            return ''
        } else if (depth === maxDepth) {
            return data[x][y]
        }
        return data[x][y] + getAllPossible(x + dx, y + dy, dx, dy, depth + 1, maxDepth)
    }

    const answers = ['SAM', 'MAS']

    const calculate = () => {
        const res = data.flatMap((line, x) => {
            return line.flatMap((col, y) => {
                if (col === 'X') {
                    return [
                        getAllPossible(x, y, 1, 0, 0, 3),
                        getAllPossible(x, y, 1, 1, 0, 3),
                        getAllPossible(x, y, 0, 1, 0, 3),
                        getAllPossible(x, y, 1, -1, 0, 3),
                        getAllPossible(x, y, 0, -1, 0, 3),
                        getAllPossible(x, y, -1, -1, 0, 3),
                        getAllPossible(x, y, -1, 0, 0, 3),
                        getAllPossible(x, y, -1, 1, 0, 3),
                    ]
                }
                return []
            })
        }).filter(d => d === 'XMAS')

        const res2 = data.flatMap((line, x) => {
            return line.map((col, y) => {
                if (col === 'A') {
                    const firstDiag = getAllPossible(x + 1, y + 1, 1, 1, 0, 0) + 'A' + getAllPossible(x - 1, y - 1, -1, -1, 0, 0)
                    const secondDiag = getAllPossible(x - 1, y + 1, -1, 1, 0, 0) + 'A' + getAllPossible(x + 1, y - 1, 1, -1, 0, 0)
                    if (answers.includes(firstDiag) && answers.includes(secondDiag)) {
                        return 1
                    }
                }
                return 0
            })
        })

        setResult1(res.length)
        setResult2(sum(res2))
    }

    return (
        <DayDisplay
            day={4}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer4
