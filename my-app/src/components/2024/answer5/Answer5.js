import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { intersection, sum } from 'lodash'
import DayDisplay from '../../DayDisplay'

const Answer5 = () => {
    const [rules, setRules] = useState([])
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const parts = text.replaceAll('\r', '').split('\n\n')

                setData(parts[1].split('\n').map(line => line.split(',').map(d => parseInt(d))))

                setRules(parts[0].split('\n').reduce((acc, line) => {
                    const vals = line.split('|')
                    return { ...acc, [vals[0]]: [...(acc[vals[0]]||[]), parseInt(vals[1])]}
                }, {}))
            });
    }, [])

    const checkLine = (line) => line.every((val, index) =>
        (index === line.length - 1 && !rules[val]) || (rules[val] && line.filter((_, i) => i > index).every((v) => rules[val]?.indexOf(v) !== -1))
    )

    const calculate = () => {
        const res = sum(data.map(line => checkLine(line) ? line[(line.length - 1) / 2] : 0))
        const res2 = sum(data.map(line => !checkLine(line) ? line.find(val => intersection(line, rules[val] || []).length === ((line.length - 1) / 2)) : 0 ))

        setResult1(res)
        setResult2(res2)
    }

    return (
        <DayDisplay
            day={5}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer5
