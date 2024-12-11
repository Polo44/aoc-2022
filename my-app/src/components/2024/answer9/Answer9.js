import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import DayDisplay from '../../DayDisplay'
import { isFunction, keys, range, reverse, uniqBy } from 'lodash'

const Answer9 = () => {
    const [data, setData] = useState({})
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split(''))
            })
    }, [])

    const getRes1 = () => {
        let reverse = [], line = [], res = []
        data.forEach((val, i) => {
            if (i % 2 === 0) {
                range(0, val).forEach(_ => line.push(i / 2))
                range(0, val).forEach(_ => reverse.unshift(i / 2))
            } else {
                range(0, val).forEach(_ => line.push('.'))
            }
        })

        range(0, reverse.length).reduce((acc, val) => {
            if (line[val] === '.') {
                res.push(reverse[acc])
                return acc + 1
            } else {
                res.push(line[val])
                return acc
            }
        }, 0)

        return res
    }

    const getRes2 = () => {
        let values = [], line = [], res = []
        data.forEach((val, i) => {
            if (i % 2 === 0) {
                line.push({ nb: parseInt(val), val: i / 2 })
                values.push({ nb: parseInt(val), val: i / 2 })
            } else {
                line.push({ nb: parseInt(val), val: '.' })
            }
        })

        while (values.length) {
            const current = values.pop()
            const position2 = line.findIndex(l => l.val === current.val && l.val)
            const position = line.findIndex((l, i) => l.val === '.' && l.nb >= current.nb && i < position2)
            if (position >= 0) {
                line[position2] = { nb: line[position2].nb, val: '.' }
                line = line.filter(l => l.val !== current.val)
                if (line[position].nb > current.nb) {
                    line = [...line.slice(0, position), current, { nb: line[position].nb - current.nb, val: '.'}, ...line.slice(position + 1) ]
                } else {
                    line[position] = current
                }
            }
        }

        line.forEach(val => {
            range(0, val.nb).forEach(_ => res.push(val.val))
        })

        return res
    }

    const getResult = (tab) => tab.reduce((acc, val, i) => val !== '.' ? acc + i * val : acc, 0)

    const calculate = () => {
        const res = getRes1()
        setResult1(getResult(res))

        const res2 = getRes2()
        setResult2(getResult(res2))
    }

    return (
        <DayDisplay
            day={9}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer9
