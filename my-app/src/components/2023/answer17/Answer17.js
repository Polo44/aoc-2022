import React, { useEffect, useState } from "react";
import raw from './input.txt'
import DayDisplay from "../../DayDisplay";
import { keys, max, min, range, sum, sumBy, uniqBy } from "lodash";
import { transpose } from "../../utils";

const Answer17 = ({
}) => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => d.split('')))
            })
    }, [])

    const lMax = data.length - 1
    const cMax = data?.[0]?.length - 1
    let memo = { 'X' : 0 }
    const maxValue = lMax * cMax * 9

    const direction = {
        u: { l: -1, c: 0, f: 'd' },
        d: { l: 1, c: 0, f: 'u' },
        l: { l: 0, c: -1, f: 'r' },
        r: { l: 0, c: 1, f: 'l' },
    }

    const getNewDir = (dir) => {
        return ['u', 'd', 'l', 'r'].filter(v => v !== direction[dir.charAt(0)]?.f && (dir.length !== 3 || v !== dir.charAt(0)))
    }

    const navigate = ({ l, c, d }, acc) => {
        const point = parseInt(data[l][c]) + acc
        const memoPoint = memo[`${l}-${c}`] || maxValue

        if (memoPoint < point || memo[`${lMax}-${cMax}`] < point) {
            return maxValue
        } else if (l === lMax && c === cMax && memoPoint > point) {
            memo[`${l}-${c}`] = point
            return point
        }
        const newDirs = getNewDir(d)
        return min(newDirs.map(nd => {
            const newDir = direction[nd]
            const newL = l + newDir.l
            const newC = c + newDir.c
            if (newL >= 0 && newL <= lMax && newC >= 0 && newC <= cMax) {
                const pointValue = (d !== 'X' ? point : 0)
                memo[`${l}-${c}`] = pointValue
                return navigate({ l: newL, c: newC, d: nd !== d.charAt(0) ? nd : d + nd }, pointValue)
            }
            return maxValue
        }))
    }

    const calculate = () => {
        console.log({ memo })
        setResult1(navigate({ l: 0, c: 0, d: 'X' }))
    }

    return (
        <DayDisplay
            day={17}
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

export default Answer17