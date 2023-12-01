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

    const reverseNumbers = {
        eno: '1',
        owt: '2',
        eerht: '3',
        ruof: '4',
        evif: '5',
        xis: '6',
        neves: '7',
        thgie: '8',
        enin: '9'
    }

    const regex = '[0-9]|one|two|three|four|five|six|seven|eight|nine'
    const reverseRegex = '[0-9]|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin'

    const answer1 = data.reduce((acc, line) => {
        const reverse = line.split('').reverse().toString()
        return acc + parseInt(line[line.search('[0-9]')] + reverse[reverse.search('[0-9]')])
    }, 0)

    const answer2 = data.reduce((acc, line) => {
        const reverse = line.split('').reverse().toString().replaceAll(',', '')
        const first = line.match(regex)[0]
        const second = reverse.match(reverseRegex)[0]
        return acc + parseInt('' + (numbers[first] || first) + (reverseNumbers[second] || second))
    }, 0)

    return (
        <div className="App">
            <div>
                {answer1}
            </div>
            <div>
                {answer2}
            </div>
        </div>
    );
}

export default Answer12023;
