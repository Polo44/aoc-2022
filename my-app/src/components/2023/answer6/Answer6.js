import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { orderBy, range } from 'lodash'

const Answer6 = () => {
    const [time, setTime] = useState([])
    const [distance, setDistance] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const setOfData = text.replaceAll('\r', '').split('\n')
                setTime([parseInt(setOfData[0].replaceAll('Time:', '').replaceAll(' ', ''))])
                setDistance([parseInt(setOfData[1].replaceAll('Distance:', '').replaceAll(' ', ''))])
            })
    }, [])

    console.log({ time, distance })
    const start = Date.now();

    const answer1 = time.reduce((acc, value, index) => {
        const limit = distance[index]
        console.log({ value, limit, test: range(1, value).reduce((accDist, val) => ((value - val) * val) > limit ? accDist + 1 : accDist, 0) })
        return acc * range(1, value).reduce((accDist, val) => ((value - val) * val) > limit ? accDist + 1 : accDist, 0)
    }, 1)

    const millis = Date.now() - start;

    console.log({ millis })

    return (
        <div className="App">
            Day 6 :
            <div>
                {answer1}
            </div>
            {/* <div>
                {answer2?.[0]?.start}
            </div> */}
        </div>
    );
}

export default Answer6
