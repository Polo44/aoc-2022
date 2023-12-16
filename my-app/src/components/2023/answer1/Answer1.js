import React, { useEffect, useState } from "react";
import raw from './input.txt'
import DayDisplay from "../../DayDisplay";

const Answer1 = ({
}) => {
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

    const numbers = {
        one: '1',
        two: '2',
        three: '3',
        four: '4',
        five: '5',
        six: '6',
        seven: '7',
        eight: '8',
        nine: '9'
    }

    const answer = (regex) => {
        return data.reduce((acc, line) => {
            const matches = [...line.matchAll(regex)]
            return acc + parseInt('' + (numbers[matches[0][1]] || matches[0][1]) + (numbers[matches[matches.length - 1][1]] || matches[matches.length - 1][1]))
        }, 0)
    }

    return (
        <DayDisplay
            day={1}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                setResult1(answer('(?=(\\d))'))
                setResult2(answer('(?=(\\d|one|two|three|four|five|six|seven|eight|nine))'))
                cbTime()
            }}
        />
    )
}

export default Answer1