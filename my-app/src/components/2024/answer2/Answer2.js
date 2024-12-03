import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { max, keys, uniq, isEqual, sum, min } from 'lodash'
import DayDisplay from '../../DayDisplay'

const Answer2 = () => {
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

    const isOkay = (line, ol) => {
        const splitted = line.map(d => parseInt(d))
        const [head, ...tail] = splitted[0] > min(splitted) ? splitted.reverse() : splitted
        const test = tail.reduce((acc2, val2) => val2 - acc2 > 0 && val2 - acc2 < 4 ? val2 : -15, head)
        return test >= 0 ? 1 : 0
    }

    const calculate = (cbTime) => {
        const result = data.reduce((acc, line) => acc + isOkay(line.split(' ')), 0)
        setResult1(result)

        const result2 = data.reduce((acc, line) => {
            const splitted = line.split(' ')
            const res = sum(splitted.map((_, i) => isOkay(splitted.filter((_, i2) => i !== i2), splitted)))
            return res > 0 ? acc + 1 : acc
        }, 0)

        setResult2(result2)
        cbTime()
    }

    return (
        <DayDisplay
            day={2}
            result1={result1}
            result2={result2}
            getResults={calculate}
        />
    )
}

export default Answer2
