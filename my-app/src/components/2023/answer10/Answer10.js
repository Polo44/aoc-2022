import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { countBy, keys } from 'lodash'

const Answer10 = () => {
    const [data, setData] = useState([])
    const [start, setStart] = useState({})

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                const setOfData = text.replaceAll('\r', '').split('\n').map(l => l.split(''))
                setData(setOfData)
                setOfData.forEach((line, l) => line.forEach((val, c) => {
                    if (val === 'S') setStart({ l, c })
                }))
            })
    }, [])

    const pipes = {
        '-': { l: 0, c: 1, w: 'e', from: 'w', reverse: { l: 0, c: -1, from: 'e' } },
        '|': { l: 1, c: 0, n: 's', from: 'n', reverse: { l: -1, c: 0, from: 's' } },
        'L': { l: 0, c: 1, n: 'e', from: 'w', ns: 'prev', reverse: { l: -1, c: 0, from: 's', ns: 'next' } },
        'J': { l: 0, c: -1, n: 'w', from: 'e', ns: 'next', reverse: { l: -1, c: 0, from: 's', ns: 'prev' } },
        '7': { l: 1, c: 0, w: 's', from: 'n', ns: 'next', reverse: { l: 0, c: -1, from: 'e', ns: 'prev' } },
        'F': { l: 0, c: 1, s: 'e', from: 'w', ns: 'next', reverse: { l: 1, c: 0, from: 'n', ns: 'prev' } },
    }

    const sides = {
        'b': { l: 1, c: 0, next: 'l', prev: 'r' },
        'r': { l: 0, c: 1, next: 'b', prev: 't' },
        'l': { l: 0, c: -1, next: 't', prev: 'b' },
        't': { l: -1, c: 0, next: 'r', prev: 'l' },
    }

    let l = start.l + 1, c = start.c, from = 'n', index = 1, pipe, nextDirection, allPoints = { [`${start.l}-${start.c}`]: 'l' }

    while (data.length && data[l][c] !== 'S') {
        index += 1
        pipe = data[l][c]
        allPoints = { ...allPoints, [`${l}-${c}`]: 'l'}
        nextDirection = pipes[pipe][from] ? pipes[pipe] : pipes[pipe].reverse
        l = l + nextDirection.l
        c = c + nextDirection.c
        from = nextDirection.from
    }

    const checkPoint = (l, c, points) => {
        if (points[`${l}-${c}`]) {
            return points
        }
        const newAcc = { ...points, [`${l}-${c}`]: 'v' }
        const right = { ...newAcc, ...checkPoint(l, c + 1, newAcc, 'h') }
        const left = { ...right, ...checkPoint(l, c - 1, right, 'h') }
        const top = { ...left, ...checkPoint(l - 1, c, left, 'v') }
        return { ...top, ...checkPoint(l + 1, c, top, 'v') }
    }

    l = start.l + 1
    c = start.c
    from = 'n'
    let side = sides.r

    while (data.length && data[l][c] !== 'S') {
        pipe = data[l][c]
        nextDirection = pipes[pipe][from] ? pipes[pipe] : pipes[pipe].reverse
        allPoints = checkPoint(l + side.l, c + side.c, allPoints)
        if (pipe === 'L' || pipe === 'J' || pipe === '7' || pipe === 'F') {
            side = sides[side[nextDirection.ns]]
            allPoints = checkPoint(l + side.l, c + side.c, allPoints)
        }
        l = l + nextDirection.l
        c = c + nextDirection.c
        from = nextDirection.from
    }
    console.log({ allPoints })
    console.log({ t: keys(allPoints).reduce((acc, key) => allPoints[key] === 'v' ? [...acc, key] : acc, []) })

    return (
        <div className="App">
            Day 10 :
            <div>
                {index / 2}
            </div>
            <div>
                {countBy(allPoints)?.v}
            </div>
        </div>
    );
}

export default Answer10
