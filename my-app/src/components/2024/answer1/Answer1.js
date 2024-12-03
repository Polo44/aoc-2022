import React, { useEffect, useState } from "react";
import raw from './input.txt'
import DayDisplay from "../../DayDisplay";
import { compact, groupBy, sum } from "lodash";

const Answer1 = ({
}) => {
    const [left, setLeft] = useState([])
    const [right, setRight] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const { left: leftData, right: rightData } = text.replaceAll('\r', '').split('\n').reduce((acc, val) => {
                    const split = compact(val.split(' '))
                    return { right: [...acc.right, parseInt(split[1])], left: [...acc.left, parseInt(split[0])] }
                }, { right: [], left: [] })
                setLeft(leftData)
                setRight(rightData)
            });
    }, [])

    const answer = () => {
        const leftOrdered = left.sort()
        return right.sort().reduce((acc, val, i) => {
            return acc + Math.abs(val - leftOrdered[i])
        }, 0)
    }

    const answer2 = () => {
        const groupedRight = groupBy(right)
        return left.reduce((acc, val) =>  acc + (val * (groupedRight[val] || []).length), 0)
    }

    return (
        <DayDisplay
            day={1}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                setResult1(answer)
                setResult2(answer2)
                cbTime()
            }}
        />
    )
}

export default Answer1