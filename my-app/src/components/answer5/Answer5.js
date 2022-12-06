import { dropRight, flatten, takeRight, zip } from "lodash";
import React, { useEffect, useState } from "react";
import raw from './input.txt'

const Answer5 = ({
}) => {
    const [data, setData] = useState([])
    const [moves, setMoves] = useState([])

    const transpose = (matrix) => {
        return zip(...matrix)
    }

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const parsed = text.replaceAll('\r', '').split('\n')
                const matrix = transpose(parsed.slice(0, 8).reverse().map((d, i) => d.split('').map((d2, i2) => i2 % 4 === 1 ? d2 : '').filter(d => d !== '')))
                setData(matrix.map(d => d.filter(d2 => !!d2 && d2 !== ' ')))
                setMoves(parsed.slice(10).map(d => d.replace('move ', '').replace(' to ', ' from ').split(' from ').map(d2 => parseInt(d2))))
            });
    }, [])

    useEffect(() => {
        let dataTemp = data
        moves.forEach(([nbElement, startIndex, endIndex]) => {
            const newColumn = [...dataTemp[endIndex - 1], ...takeRight(dataTemp[startIndex - 1], nbElement)/*.reverse() */] // for ex 1 uncomment
            dataTemp = dataTemp.map((d, i) => {
                if (i === startIndex - 1) {
                    return dropRight(d, nbElement)
                } else if (i === endIndex - 1) {
                    return newColumn
                } else {
                    return d
                }
            })
        setData(dataTemp)
        })
    }, [moves])

    return (
        <div className="App">
            <div>
                {flatten(data.map(d => takeRight(d)))}
            </div>
            {/* <div>
                {result2}
            </div> */}
        </div>
    );
}

export default Answer5;
