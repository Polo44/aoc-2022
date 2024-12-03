import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import DayDisplay from '../../DayDisplay'

const Answer3 = () => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            });
    }, [])

    const calculate = (regex) => {
        return data.reduce((acc, line) => [...line.matchAll(regex)].reduce((acc2, vals) =>
            vals[0] === 'do()' ? { ...acc2, factor: 1 } :
                vals[0] === 'don\'t()' ? { ...acc2, factor: 0 }
                    : { ...acc2, res: acc2.res + (vals[1] * vals[2] * acc2.factor) }
        , acc)
        , { res: 0, factor: 1 }).res
    }

    return (
        <DayDisplay
            day={3}
            result1={result1}
            result2={result2}
            getResults={cbTime => {
                setResult1(calculate('mul\\((\\d+),(\\d+)\\)'))
                setResult2(calculate('do\\(\\)|don\'t\\(\\)|mul\\((\\d+),(\\d+)\\)'))
                cbTime()
            }}
        />
    )
}

export default Answer3
