import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer2 = ({
}) => {
    const [data, setData] = useState([0])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => d.split(' ')))
            });
    }, [])

    const values = {
        AX: 3,
        BY: 3,
        CZ: 3,
        AY: 6,
        BZ: 6,
        CX: 6
    }

    const result = data.reduce((acc, value) => {
        const firstValue = value[1] === 'X' ? 1 : value[1] === 'Y' ? 2 : 3
        const secondValue = values[value[0] + value[1]] || 0
        return acc + firstValue + secondValue
    }, 0)

    const win = {
        A: 2,
        B: 3,
        C: 1,
    }

    const lose = {
        A: 3,
        B: 1,
        C: 2,
    }

    const draw = {
        A: 1,
        B: 2,
        C: 3,
    }

    const result2 = data.reduce((acc, value) => {
        if (value[1] === 'X') {
            return acc + 0 + lose[value[0]]
        } else if (value[1] === 'Y') {
            return acc + 3 + draw[value[0]]
        } else {
            return acc + 6 + win[value[0]]
        }
    }, 0)

    return (
        <div className="App">
            <div>
                {result}
            </div>
            <div>
                {result2}
            </div>
        </div>
    );
}

export default Answer2;
