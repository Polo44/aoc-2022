import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer12023 = ({
}) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n'))
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
        <div className="App">
            Day 1 :
            <div>
                {answer('(?=([0-9]))')}
            </div>
            <div>
                {answer('(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))')}
            </div>
        </div>
    );
}

export default Answer12023;
