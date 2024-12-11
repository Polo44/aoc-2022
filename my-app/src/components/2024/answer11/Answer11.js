import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import DayDisplay from '../../DayDisplay'
import { isFunction, keys, range, sum, uniqBy } from 'lodash'

const Answer11 = () => {
    const [data, setData] = useState({})
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split(' '))
            })
    }, [])

    let cache = {}

    const count = (nb, depth, limit) => {
        if (cache[`${nb}-${limit - depth}`]) return cache[`${nb}-${limit - depth}`]
        if (depth === limit) return 1
        if (nb === '0') return count('1', depth + 1, limit)
        if (nb.length % 2 === 1) return count('' + (parseInt(nb) * 2024), depth + 1, limit)
        cache[`${nb}-${limit - depth}`] = count('' + parseInt(nb.substring(0, nb.length / 2)), depth + 1, limit) + count('' + parseInt(nb.substring(nb.length / 2)), depth + 1, limit)
        return cache[`${nb}-${limit - depth}`]
    }

    const calculate = () => {
        cache = {}
        const res = data.reduce((acc, val) => acc + count(val, 0, 25), 0)
        const res2 = data.reduce((acc, val) => acc + count(val, 0, 75), 0)

        setResult1(res)
        setResult2(res2)
    }

    return (
        <DayDisplay
            day={11}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer11
