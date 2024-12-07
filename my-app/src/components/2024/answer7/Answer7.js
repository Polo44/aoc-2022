import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { compact, keys } from 'lodash'
import DayDisplay from '../../DayDisplay'

const Answer7 = () => {
    const [data, setData] = useState({})
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').reduce((acc, line) => {
                    const parts = line.split(':')
                    return { ...acc, [parts[0]]: compact(parts[1].split(' ').map(d => parseInt(d)))}
                }, {}))
            })
    }, [])

    const tries = (line, key, limit, depth, res, part2) =>
        (depth < limit) ?
             tries(line, key, limit, depth + 1, res + line[depth], part2)
                || tries(line, key, limit, depth + 1, res * line[depth], part2)
                || (part2 && tries(line, key, limit, depth + 1, parseInt('' + res + line[depth]), part2))
            : res === key

    const calculate = () => {
        const res = keys(data).reduce((acc, key) => tries(data[key], parseInt(key), data[key].length, 1, data[key][0]) ? acc + parseInt(key) : acc, 0)
        const res2 = keys(data).reduce((acc, key) => tries(data[key], parseInt(key), data[key].length, 1, data[key][0], true) ? acc + parseInt(key) : acc, 0)

        setResult1(res)
        setResult2(res2)
    }

    return (
        <DayDisplay
            day={7}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer7
