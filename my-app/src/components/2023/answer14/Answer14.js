import React, { useEffect, useState } from "react";
import raw from './input.txt'
import DayDisplay from "../../DayDisplay";
import { range, sum, sumBy } from "lodash";
import { transpose } from "../../utils";

const Answer14 = ({
}) => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n').map(d => d.split('')))
            });
    }, [])

    const getGroundValue = (AllRocks, lLength) => {
        return sum(AllRocks.map(line => sumBy(line.rocks, nr => lLength - nr.c)))
    }

    const getGroundValue2 = (ground) => {
        return ground.reduce((acc, line, l) => {
            return acc + line.reduce((accC, col, c) => {
                return accC + 0 // todo
            }, 0)
        }, 0)
    }

    const getNewRocks = (ground) => {
        return ground.map((line, index) => {
            return line.reduce((accLine, char, c) => {
                if (char === '.') return accLine
                if (char === 'O') return { ...accLine, counter: accLine.counter + 1, rocks: [...accLine.rocks, { index, c: accLine.c + accLine.counter, v: 'O' }] }
                return { ...accLine, counter: 1, c, ht: [...accLine.ht, { index, c, v: '#' }] }
            }, { c: 0, counter: 0, rocks: [], ht: [] })
        })
    }

    const recreateGround = (AllRocks, lLength, cLength) => {
        const allRocksflatten = AllRocks.flatMap(r => [ ...r.rocks, ...r.ht ])
        return range(0, lLength).map(l => {
            return range(0, cLength).map((c) => allRocksflatten.find(r => r.c === c && r.index === l)?.v || '.')
        })
    }

    const adaptGround = (currentCycle, ground, reverse) => {
        switch (currentCycle) {
            case 'n': return transpose(ground)
            case 'e': return ground.map(line => line.reverse())
            case 's': return reverse ? transpose(ground.map(line => line.reverse())) :  transpose(ground).map(line => line.reverse())
            default:
                return ground
        }
    }

    const toSGround = ground => ground.map(line => line.join('')).join('')

    let memo = {}

    const getNewGroundCycles = (cycles, acc) => {
        return cycles.split('').reduce(({ ground }, c) => {
            const aGround = adaptGround(c, ground)
            const newRocks = getNewRocks(aGround)
            const newGround = adaptGround(c, recreateGround(newRocks, aGround[0].length, aGround[0].length), true)
            return { ground: newGround, value: getGroundValue(newRocks, aGround.length) }
        }, acc)
    }
    const calculate = () => {
        // setResult1(getNewGroundCycles('n')?.value)
        let repeat = 200
        let result = { ground: data }
        while (repeat > 0) {
            const groundString = toSGround(result.ground)
            if (memo[groundString]) {
                console.log('already know')
                result = memo[groundString]
            } else {
                result = getNewGroundCycles('nwse', result)
                memo[groundString] = result
            }
            repeat--
        }
        console.log({ data, result, memo })
        setResult2(result?.value)
    }

    return (
        <DayDisplay
            day={14}
            result1={result1}
            result2={result2}
            getResults={(cbTime) => {
                calculate()
                cbTime()
            }}
            current
        />
    )
}

export default Answer14