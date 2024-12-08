import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import DayDisplay from '../../DayDisplay'
import { keys, uniqBy } from 'lodash'

const Answer8 = () => {
    const [data, setData] = useState({})
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => d.split('')))
            })
    }, [])

    const getNext = (acc, l, c, v) => {
        const newL = l + v.l, newC = c + v.c
        if (newL >= 0 && newL < data.length && newC >= 0 && newC < data[0].length) {
            return getNext([ ...acc, { l: newL, c: newC }], newL, newC, v)
        }
        return acc
    }

    const getAllAntennas = (pairs) => {
        return pairs.reduce(({ pairs: [head, ...tail], res }) => {
            return {
                pairs: tail, res: [
                    ...res,
                    ...tail.flatMap(t => {
                        return [...getNext([], head.l, head.c, { l: head.l - t.l, c: head.c - t.c }), ...getNext([], t.l, t.c, { l: t.l - head.l, c: t.c - head.c })]
                    })
                ]
            }
        }, { pairs , res: []}).res
    }

    const calculate = () => {
        const pairs = data.reduce((acc, line, l) => line.reduce((acc2, val, c) => val !== '.' ? { ...acc2, [val]: [...(acc2[val] || []), { l, c }] } : acc2, acc), {})
        const antennas = data.reduce((acc, line, l) => line.reduce((acc2, val, c) => val !== '.' ? [ ...acc2, { l, c }] : acc2, acc), [])

        const res = uniqBy(keys(pairs).reduce((acc, key) => [...acc, ...getAllAntennas(pairs[key])], []).filter(({ l, c }) => l >= 0 && l < data.length && c >= 0 && c < data[0].length && !antennas.some(a => a.l === l && a.c === c)), ({ l, c }) => `${l}-${c}`)

        // const display = data.map((line, l) => line.map((col, c) => {
        //     const t = res.find(r => r.l === l && r.c === c)
        //     return col === '.' && t ? '#' : col
        // }).join(''))

        // console.log({ display })

        setResult1(res.length + antennas.length)
        // setResult2(res2)
    }

    return (
        <DayDisplay
            day={8}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer8
