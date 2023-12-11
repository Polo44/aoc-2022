import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { countBy, keys, take, uniq } from 'lodash'

const Answer11 = () => {
    const [data, setData] = useState([])
    const [start, setStart] = useState({})

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(l => l.split('')))
            })
    }, [])

    console.log({ data })

    const galaxies = data.reduce((acc, line, l) => {
        const newGalaxies = line.reduce((accG, val, c) => {
            return val !== '.' ? [...accG, { l, c } ] : accG
        }, [])
        return [ ...acc, ...newGalaxies ]
    }, [])

    console.log({ galaxies })

    const lines = uniq(galaxies.map(g => g.l))
    const cols = uniq(galaxies.map(g => g.c))

    console.log({ lines, cols })

    const galaxiesWithSpace = galaxies.map(g => {
        const supL = g.l - lines.filter(l => l < g.l).length
        const supC = g.c - cols.filter(c => c < g.c).length
        return { l: g.l + (supL * 1000000) - supL, c: g.c + (supC * 1000000) - supC}
    })

    console.log({ galaxiesWithSpace })

    const answer1 = galaxiesWithSpace.reduce((acc, galaxy, index) => {
        return acc + galaxiesWithSpace.slice(index, galaxiesWithSpace.length).reduce((acc2, galaxy2) => {
            return acc2 + Math.abs(galaxy2.l - galaxy.l) + Math.abs(galaxy2.c - galaxy.c)
        }, 0)
    }, 0)

    return (
        <div className="App">
            Day 11 :
            <div>
                {answer1}
            </div>
            {/* <div>
                {countBy(allPoints)?.v}
            </div> */}
        </div>
    );
}

export default Answer11
