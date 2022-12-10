import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer10 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n').map(d => d.split(' ')))
            })
    }, [])

    const cycleExtract = [20, 60, 100, 140, 180, 220]
    
    const draw = (acc) => {
        const actualPos = acc.picture.replace('\n', '').length % 40
        return {
            ...acc,
            picture: acc.picture + (actualPos >= acc.cycleCounter - 1 && actualPos <= acc.cycleCounter + 1 ? '#' : '.')
        }
    } 
    
    const checkResult = (acc, value) => {
        const drawedAcc = { ...draw(acc), cycleCounter: acc.cycleCounter + value, cycle: acc.cycle + 1 }
        return cycleExtract.includes(drawedAcc.cycle) ? { ...drawedAcc, count: drawedAcc.count + (drawedAcc.cycle * drawedAcc.cycleCounter) } : drawedAcc
    }
    const addAcc = (acc, value) => checkResult(checkResult(acc, 0), value)
    
    const result = data.reduce((acc, value) => 
        value[0] === 'noop' ? checkResult(acc, 0) : addAcc(acc, parseInt(value[1]))
    , { count: 0, cycle: 1, cycleCounter: 1, picture : ''})

    return (
        <div className="App">
            <div>
                {result.count}
            </div>
            <div style={{ whiteSpace: 'pre-line', fontFamily: 'consolas' }} > 
                {result.picture.split('').map((d, i) => i % 40 === 39 ? d + '\n' : d)}
            </div>
        </div>
    )
}

export default Answer10
