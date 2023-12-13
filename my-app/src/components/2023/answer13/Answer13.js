import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { range, zip } from 'lodash'

const Answer13 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n\n').map(d => d.split('\n')))
            })
    }, [])

    const checkLinesDiff = (line, lineToCompare) => {
        return line.split('').reduce((acc, col, c) => col !== lineToCompare.split('')[c] ? [...acc, c] : acc, [])
    }

    const findMirrorValue = (scheme, nbError) => {
        const errors = scheme.flatMap((line, index) => {
            const nbErrors = range(0, line.length).reduce((acc, val) => {
                if (!scheme[index - val] || !scheme[index + val + 1]) return acc
                return acc + (checkLinesDiff(scheme[index - val], scheme[index + val + 1])).length
            }, 0)
            return { nbErrors, index: index + 1 }
        })

        return errors.filter(d => d.nbErrors === nbError && d.index !== scheme.length)?.[0]?.index|| 0
    }

    const transpose = (matrix) => {
        return zip(...matrix)
    }

    const getResult = (nbError) => data.reduce((acc, scheme) => {
        const schemeLValue = findMirrorValue(scheme, nbError)
        const schemeCValue = findMirrorValue(transpose(scheme.map(d => d.split(''))).map(d => d.toString().replaceAll(',', '')), nbError)
        return acc + (100 * schemeLValue) +  schemeCValue
    }, 0)

    return (
        <div className="App">
            Day 13 :
            <div>
                {getResult(0)}
            </div>
            <div>
                {getResult(1)}
            </div>
        </div>
    );
}

export default Answer13
