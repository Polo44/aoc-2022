import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { range, uniq } from 'lodash'
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

    const calculate = (cbTime) => {
        const stars = data.reduce((acc, line, index) => {
            const matches = [...line.matchAll('[^0-9|\\.]')]
            return matches.length ? [...acc, ...matches.reduce((accM, v) => ([...accM, { l: index, c: v.index, v: v[0] }]), [])] : acc
        }, [])

        setResult1(data.reduce((acc, line, index) => {
            const matches = [...line.matchAll('[0-9]+')]
            const lines = range(index - 1, index + 2)

            return acc + matches.reduce((acc, m) => {
                const cols = range(m.index - 1, m.index + m[0].length + 1)
                const condition = lines.some(l => cols.some(c => {
                    return stars.some(s => s.l === l && s.c === c)
                }))
                return acc + (condition ? parseInt(m[0]) : 0)
            }, 0)
        }, 0))

        const values = data.reduce((acc, line, index) => {
            const matches = [...line.matchAll('[0-9]+')]
            return matches.length ? [...acc, ...matches.reduce((accM, v) => {
                const toAdd = range(0, v[0].length).map(d => ({ l: index, c: d + v.index, v: v[0] }))
                return [...accM, ...toAdd]
            }, [])] : acc
        }, [])

        setResult2(data.reduce((acc, line, index) => {
            const matches = [...line.matchAll('\\*')]
            const lines = range(index - 1, index + 2)

            return acc + matches.reduce((acc, m) => {
                const cols = range(m.index - 1, m.index + 2)
                const condition = uniq(lines.flatMap(l => {
                    return cols.reduce((accC, c) => {
                        const toAdd = values.find(v => v.c === c && v.l === l)
                        return toAdd ? [...accC, toAdd.v] : accC
                    }, [])
                }))
                return condition.length === 2 ? acc + (condition[0] * condition[1]) : acc
            }, 0)
        }, 0))
        cbTime()
    }

    return (
        <DayDisplay
            day={3}
            result1={result1}
            result2={result2}
            getResults={calculate}
        />
    )
}

export default Answer3
