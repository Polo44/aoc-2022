import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import DayDisplay from '../../DayDisplay'
import { isFunction, keys, range, uniqBy } from 'lodash'

const Answer10 = () => {
    const [data, setData] = useState({})
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(line => line.split('')))
            })
    }, [])

    const getTrailHead = (l, c) => {
        let toCheck = [{ l, c, v: '0' }], endS = [], val, el
        while (toCheck.length) {
            // const t = [ ...toCheck ]
            // console.log(t)
            el = toCheck[0]
            toCheck.shift()
            // console.log({ el, toCheck })
            val = parseInt(data?.[el.l]?.[el.c])
            if (val === 9) {
                endS.push(el)
            } else {
                if (parseInt(data?.[el.l + 1]?.[el.c]) === val + 1) toCheck.push({ ...el, l: el.l + 1, v: data[el.l + 1][el.c] })
                if (parseInt(data?.[el.l - 1]?.[el.c]) === val + 1) toCheck.push({ ...el, l: el.l - 1, v: data[el.l - 1][el.c] })
                if (parseInt(data?.[el.l]?.[el.c + 1]) === val + 1) toCheck.push({ ...el, c: el.c + 1, v: data[el.l][el.c + 1] })
                if (parseInt(data?.[el.l]?.[el.c - 1]) === val + 1) toCheck.push({ ...el, c: el.c - 1, v: data[el.l][el.c - 1] })
            }
        }
        return endS.length
    }

    const calculate = () => {
        console.log({ data })
        const res = data.reduce((accL, line, l) => line.reduce((accC, col, c) =>
                col === '0' ? accC + getTrailHead(l, c) : accC
            , accL)
        , 0)

        setResult1(res)
        // setResult2(res2)
    }

    return (
        <DayDisplay
            day={10}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
        />
    )
}

export default Answer10
