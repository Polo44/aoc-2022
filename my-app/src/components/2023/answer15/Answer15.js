import React, { useEffect, useState } from "react";
import raw from './input.txt'
import DayDisplay from "../../DayDisplay";
import { keys, range, sum, sumBy } from "lodash";
import { transpose } from "../../utils";

const Answer15 = ({
}) => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split(','))
            })
    }, [])

    const getHash = (values) => {
        return values.split('').reduce((acc, val) => {
            return ((acc + val.charCodeAt(0)) * 17) % 256
        }, 0)
    }

    const insertInBox = (currentBox, hash, value) => {
        const found = currentBox.find(d => d.hash === hash)
        return found ? currentBox.map(d => d.hash === hash ? { hash, value } : d) : [ ...currentBox, { hash, value }]
    }

    const calculate = () => {
        const res1 = data.reduce((res, values) => {
            return res + getHash(values)
        }, 0)

        setResult1(res1)

        const res2 = data.reduce((acc, element) => {
            const { [1]: hash, [2]: condition, [3]: value } = { ...element.match('(.*)([=|-])(\\d)?') }
            const box = getHash(hash)
            if (condition === '=') {
                return { ...acc, [box]: insertInBox(acc[box] || [], hash, value)}
            }
            return { ...acc, [box]: (acc[box] || []).filter(d => d.hash !== hash)}
        }, {})

        setResult2(keys(res2).reduce((acc, box) => acc + (res2[box].reduce((acc2, val, index) => acc2 + ((parseInt(box) + 1) * (index + 1) * val.value), 0)), 0))
    }

    return (
        <DayDisplay
            day={15}
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

export default Answer15