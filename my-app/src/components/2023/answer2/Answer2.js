import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { max, keys } from 'lodash'
import DayDisplay from '../../DayDisplay'

const Answer2 = () => {
    const [data, setData] = useState([])
    const [result1, setResult1] = useState(0)
    const [result2, setResult2] = useState(0)

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.replaceAll('\r', '').split('\n'))
            });
    }, [])

    const rules = {
        red: 12,
        green: 13,
        blue: 14
    }

    const calculate = (cbTime) => {
        const { answer1, answer2 } = data.reduce((acc, line) => {
            const [stringId, game] = line.split(':')
            const setup = game.replaceAll(';', ',').split(',').reduce((accGame, cubes) => {
                const [value, cube] = cubes.replace(' ', '').split(' ')
                return {
                    ...accGame,
                    [cube]: max([accGame[cube], parseInt(value)]),
                    condition: accGame.condition && (rules[cube] >= parseInt(value)),
                }
            }, { red: 0, green: 0, blue: 0, condition: true })

            return {
                ...acc,
                answer1: acc.answer1 + (setup.condition ? parseInt(stringId.replaceAll('Game ', '')) : 0),
                answer2: acc.answer2 + (keys(setup).reduce((accFact, key) => key !== 'condition' ? accFact * setup[key] : accFact, 1)),
            }
        }, { answer1: 0, answer2: 0 })
        setResult1(answer1)
        setResult2(answer2)
        cbTime()
    }

    return (
        <DayDisplay
            day={2}
            result1={result1}
            result2={result2}
            getResults={calculate}
        />
    )
}

export default Answer2
