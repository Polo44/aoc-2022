import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { keys, round, uniq } from 'lodash'
import DayDisplay from '../../DayDisplay'

const Answer6 = () => {
    const [data, setData] = useState([])
    const [start, setStart] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const setOfData = text.replaceAll('\r', '').split('\n').map(line => line.split(''))
                setData(setOfData)
                setOfData.forEach((line, l) => line.forEach((val, c) => {
                    if (val === '^') setStart({ l, c })
                }))
            })
    }, [])

    const dirs = {
        '^': { line: -1, col: 0, next: '>' },
        '>': { line: 0, col: 1, next: 'd' },
        'd': { line: 1, col: 0, next: '<' },
        '<': { line: 0, col: -1, next: '^'},
    }

    const follow1 = () => {
        let line = start.l, col = start.c, d = '^', visited = { [`${start.l}-${start.c}`]: 'v' }, toCheck, newLine, newCol
        while (true) {
            [newLine, newCol] = [line + dirs[d].line, col + dirs[d].col]
            toCheck = data?.[newLine]?.[newCol]
            if (!toCheck) {
                return visited
            } else if (toCheck === '#') {
                d = dirs[d].next
            } else {
                line = newLine
                col = newCol
                visited[`${newLine}-${newCol}`] = 'v'
            }
        }
    }

    const follow2 = (polLine, polCol) => {
        let line = start.l, col = start.c, d = '^', visited = {[`${start.l}-${start.c}-^`] : 'v'}, toCheck, newLine, newCol, triplet
        while (true) {
            newLine = line + dirs[d].line
            newCol = col + dirs[d].col
            toCheck = data?.[newLine]?.[newCol]
            triplet = `${newLine}-${newCol}-${d}`
            if (!toCheck) {
                return 0
            } else if (toCheck === '#' || (newLine === polLine && newCol === polCol)) {
                d = dirs[d].next
            } else if (visited[triplet]) {
                return 1
            } else {
                line = newLine
                col = newCol
                visited[triplet] = 'v'
            }
        }
    }

    const calculate = () => {
        const visited = follow1()
        const res = uniq(keys(visited))?.length

        const res2 = data.reduce((acc, line, l) => {
            console.log(`${round((l * 100) / data.length, 2)} %`)
            return line.reduce((acc2, col, c) => {
                return col !== '#' && (visited[`${l}-${c}`]) ? acc2 + follow2(l, c) : acc2
            }, acc)
        }, 0)

        setResult1(res)
        setResult2(res2)
    }

    return (
        <DayDisplay
            day={6}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer6
