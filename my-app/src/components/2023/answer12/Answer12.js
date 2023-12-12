import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { flatten, sum } from 'lodash'

const Answer12 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            })
    }, [])

    const checkIsPossible = (line, expected) => {
        const splited = line.substring(0, line.indexOf('?')).split('.').filter(d => !!d).map(d => d.length)
        return !splited.length || splited.some((d, i) => (i === splited.length - 1 && d <= expected[i])  || d === expected[i])
    }

    const checkSprings = (line, expected) => {
        const splited = line.replaceAll('?', '.').split('.').filter(d => !!d).map(d => d.length)
        return splited.toString() === expected.toString() ? 1 : 0
    }

    const replaceChar = (s, i, c) => s.substring(0, i) + c + s.substring(i + 1);

    const createLine = (lineToCheck, expected, qmR, hashtagsR, sIdx) => {
        const currentChar = lineToCheck.charAt(sIdx)

        if (qmR && currentChar !== '?') {
            return createLine(lineToCheck, expected, qmR, hashtagsR, sIdx + 1)
        }

        if (hashtagsR === 0) {
            return checkSprings(lineToCheck, expected)
        } else if ((hashtagsR > qmR) || (qmR === 0 && hashtagsR > 0) || !checkIsPossible(lineToCheck, expected)) {
            return 0
        }

        return createLine(replaceChar(lineToCheck, sIdx, '#'), expected, qmR - 1, hashtagsR - 1, sIdx + 1) +
            createLine(replaceChar(lineToCheck, sIdx, '.'), expected, qmR - 1, hashtagsR, sIdx + 1)
    }

    const start = Date.now();

    const answer1 = data.length && data.reduce((acc, line) => {
        const [tc, exp] = line.split(' ')
        const expected = (exp + ',').repeat(5).slice(0,-1)
        const toCheck = [Array(5).fill(tc)].toString('?').replaceAll(',', '?')
        const intExp = expected.split(',').map(d => parseInt(d))
        const htC = [...toCheck.matchAll('#')].length
        const qmR = [...toCheck.matchAll('\\?')].length
        const hashtagsR = sum(intExp) - htC
        console.log({ expected, toCheck, intExp, htC, qmR, hashtagsR })
        return acc + createLine(toCheck, intExp, qmR, hashtagsR, 0)
    }, 0)

    const millis = Date.now() - start;

    console.log({ millis })

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

export default Answer12
