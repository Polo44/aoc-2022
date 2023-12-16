import React, { useEffect, useState } from "react";
import raw from './input.txt'
import DayDisplay from "../../DayDisplay";
import { keys, max, range, sum, sumBy, uniqBy } from "lodash";
import { transpose } from "../../utils";

const Answer16 = ({
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

    const direction = {
        u: { l: -1, c: 0 },
        d: { l: 1, c: 0 },
        l: { l: 0, c: -1 },
        r: { l: 0, c: 1 },
    }

    const next = {
        '-': { l: ['l'], r: ['r'], u: ['l', 'r'], d: ['l', 'r'] },
        '|': { l: ['u', 'd'], r: ['u', 'd'], u: ['u'], d: ['d'] },
        '\\': { l: ['u'], r: ['d'], u: ['l'], d: ['r'] },
        '/': { l: ['d'], r: ['u'], u: ['r'], d: ['l'] },
        '.': { l: ['l'], r: ['r'], u: ['u'], d: ['d'] },
    }

    const lMax = data.length - 1
    const cMax = data?.[0]?.length - 1
    let memo = {}

    const ways = ({ l, c, d }) => {
        if (l < 0 || c < 0 || l > lMax || c > cMax || memo[`${l}-${c}-${d}`]) return false
        memo[`${l}-${c}-${d}`] = 'visited'
        return next[data[l][c]][d].map(dir => {
            const newWay = direction[dir]
            ways({ l: l + newWay.l, c: c  + newWay.c, d: dir })
        })
    }

    const getMemoValue = (memoData) => {
        return uniqBy(keys(memoData), d => {
            const matches = { ...d.match('(.*)(-)(.*)-.') }
            return matches[1] + matches[2] + matches[3]
        })?.length
    }

    const calculate = () => {
        ways({ l: 0, c: 0, d: 'r'})
        setResult1(getMemoValue(memo))

        const trialTiles = data.reduce((acc, line, l) => {
            return [...acc, ...line.reduce((acc2, _, c) => {
                const down = l === 0 ? [...acc2, { l, c , d: 'd' }] : acc2
                const right = c === 0 ? [...down, { l, c, d: 'r' }] : down
                const up = l === lMax ? [...right, { l, c, d: 'u' }] : right
                return c === cMax ? [...up, { l, c, d: 'l' }] : up
            }, []) ]
        }, [])
        setResult2(trialTiles.reduce((acc, start) => {
            memo = {}
            ways(start)
            return max([getMemoValue(memo), acc])
        }, 0))
    }

    return (
        <DayDisplay
            day={16}
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

export default Answer16