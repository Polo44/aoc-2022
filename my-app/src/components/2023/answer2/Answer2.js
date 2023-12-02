import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { max, keys } from 'lodash'

const Answer2 = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(raw)
            .then(r => r.text())
            .then(text => {
                setData(text.split('\n'))
            });
    }, [])

    const rules = {
        red: 12,
        green: 13,
        blue: 14
    }

    const { answer1, answer2 } = data.reduce((acc, line) => {
        const [stringId, game] = line.replaceAll('\r', '').split(':')
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

    return (
        <div className="App">
            Day 2 :
            <div>
                {answer1}
            </div>
            <div>
                {answer2}
            </div>
        </div>
    );
}

export default Answer2
