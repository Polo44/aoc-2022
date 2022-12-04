import { sum } from "lodash";
import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer3 = ({
}) => {
    const [data, setData] = useState([])
    const [data2, setData2] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => ({
                    first: d.slice(0, (d.length / 2)).split(''),
                    second: d.slice((d.length / 2), d.length).split(''),
                })))
            });
    }, [])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData2(text.replaceAll('\r', '').split('\n').map(d => d.split('')))
            });
    }, [])

    console.log(data)

    const result = data.reduce((acc, value) => {
        const partialResult = value.first.find(d => value.second.includes(d))
        return acc + (partialResult === partialResult.toLowerCase() ? partialResult.charCodeAt(0) % 97 : (partialResult.charCodeAt(0) % 65) + 26) + 1
    }, 0)

    const result2 = sum(data2.map((value, i) => {
        if (i % 3 === 0) {
            const partialResult = value.find(d => data2[i + 1].includes(d) && data2[i + 2].includes(d))
            return (partialResult === partialResult.toLowerCase() ? partialResult.charCodeAt(0) % 97 : (partialResult.charCodeAt(0) % 65) + 26) + 1
        }
        return 0
    }))

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

export default Answer3;
