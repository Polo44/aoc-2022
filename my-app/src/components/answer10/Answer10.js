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
    
    const checkResult = (acc) => cycleExtract.includes(acc.cycle) ? { ...acc, count: acc.count + (acc.cycle * acc.cycleCounter)} : acc
    const noop = (acc) => checkResult({ ...acc, cycle: acc.cycle + 1})
    const addAcc = (acc, value) => {
        const newAcc = noop(acc)
        return checkResult({ ...newAcc, cycle: newAcc.cycle + 1, cycleCounter: newAcc.cycleCounter + value })
    }
    
    const result1 = data.reduce((acc, value) => 
        value[0] === 'noop' ? noop(acc) : addAcc(acc, parseInt(value[1]))
    , { count: 0, cycle: 0, cycleCounter: 1})

    const result2 = data.reduce((acc, value) => {
        if (cycleExtract.includes(acc.cycle)) {
          console.log(acc)
        }
        return value[0] === 'noop' ? noop(acc) : addAcc(acc, parseInt(value[1]))
    }, { count: 0, cycle: 0, cycleCounter: 1})

    return (
        <div className="App">
            <div>
                {result1.count}
            </div>
        </div>
    )
}

export default Answer10
