import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { last } from 'lodash'

const Answer9 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            })
    }, [])

    const getLastNb = (values) => {
        if (values.every(d => d === 0)) return 0
        const newValues = values.reduce((acc, val, i) => i === 0 ? [] : [...acc, val - (values[i - 1] || 0)], [])
        return last(newValues) + getLastNb(newValues)
    }

    const getRes = (searchData) => searchData.reduce((acc, values) => acc + last(values) + getLastNb(values), 0)

    return (
        <div className="App">
            Day 9 :
            <div>
                {getRes(data.map(line => line.split(' ').map(d => parseInt(d))))}
            </div>
            <div>
                {getRes(data.map(line => line.split(' ').reverse().map(d => parseInt(d))))}
            </div>
        </div>
    );
}

export default Answer9
