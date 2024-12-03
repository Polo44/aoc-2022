import React, { useEffect, useState } from "react";
import raw from './input.txt'
import DayDisplay from "../../DayDisplay";
import { first, keys, last, max, min, orderBy, range, sum, sumBy, uniqBy } from "lodash";
import { transpose } from "../../utils";

const Answer18 = ({
}) => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            })
    }, [])

    const next = {
        U: { l: -1, c: 0 },
        D: { l: 1, c: 0 },
        L: { l: 0, c: -1 },
        R: { l: 0, c: 1 },
    }

    const getBorder = () => {
        return data.reduce((acc, line) => {
            const { 1: direction, 2: nb, 3: color } = { ...line.match('(.) ([0-9]+) \\(#(.*)\\)') }
            const { l: lStart, c: cStart } = last(acc) || { l: 0, c: 0 }
            const { l: nextL, c: nextC } = next[direction]
            return [...acc, ...range(0, parseInt(nb)).map(i => ({ l: lStart + (nextL * (i + 1)), c: cStart + (nextC * (i + 1)) }))]
        }, [])
    }

    const getInsideBorder = (border) => {
        return range(min(border.map(b => b.l)), max(border.map(b => b.l))).reduce((acc, l) => {
            const ordered = orderBy(border.filter(d => d.l === l), 'c')
            const inside = ordered.reduce((acc, point) => {
                console.log({ cur: acc.cur, point })
                if (Math.abs(point.c - acc.cur.c) <= 1) {
                    return { ...acc, cur: point}
                } else if (acc.status === 'in') {
                    return { ...acc, cur: point, sum: acc.sum + Math.abs(acc.cur.c - point.c) - 1, status: 'out' }
                }
                return { ...acc, cur: point, status: 'in' }
            }, { cur: first(ordered), sum: 0, status: 'in' })
            return acc + inside.sum
        }, 0)
    }

    const calculate = () => {
        const border = getBorder()
        console.log(border)
        const insideBorder = getInsideBorder(border)
        setResult1(border.length + insideBorder)
    }

    return (
        <DayDisplay
            day={18}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
            current
        />
    )
}

export default Answer18