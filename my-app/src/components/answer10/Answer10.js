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
        const newCarac = actualPos >= acc.cycleCounter - 1 && actualPos <= acc.cycleCounter + 1 ? '#' : '.'
        return {
            ...acc,
            picture: acc.picture + newCarac + (acc.cycle % 40 === 0 ? '\n' : '')
        }
    } 
    
    const checkResult = (acc) => {
        const newAcc = cycleExtract.includes(acc.cycle) ? { ...acc, count: acc.count + (acc.cycle * acc.cycleCounter)} : acc
        return draw(newAcc)
    }
    const noop = (acc) => checkResult({ ...acc, cycle: acc.cycle + 1})
    const addAcc = (acc, value) => {
        const newAcc = noop(acc)
        return checkResult({ ...newAcc, cycle: newAcc.cycle + 1, cycleCounter: newAcc.cycleCounter + value })
    }
    
    const result = data.reduce((acc, value) => 
        value[0] === 'noop' ? noop(acc) : addAcc(acc, parseInt(value[1]))
    , { count: 0, cycle: 0, cycleCounter: 1, picture : ''})

    return (
        <div className="App">
            <div>
                {result.count}
            </div>
            <div style={{ whiteSpace: 'pre-line', fontFamily: 'consolas' }} > 
                {result.picture}
            </div>
        </div>
    )
}

export default Answer10
