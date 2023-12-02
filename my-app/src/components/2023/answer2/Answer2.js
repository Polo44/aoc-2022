import React, { useEffect, useState } from 'react'
import raw from './input.txt'
import { max, keys } from 'lodash'

const Answer2 = ({
}) => {
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

    const answer1 = data.reduce((acc, line) => {
        const [stringId, game] = line.replaceAll('\r', '').split(':')
        const setup = game.replaceAll(';', ',').split(',').reduce((accGame, cubes) => {
            const [value, cube] = cubes.replace(' ', '').split(' ')
            return (rules[cube] < parseInt(value))
        }, false)

        return setup ? acc : acc + parseInt(stringId.replaceAll('Game ', ''))
    }, 0)

    const answer2 = data.reduce((acc, line) => {
        const [stringId, game] = line.replaceAll('\r', '').split(':')
        const setup = game.replaceAll(';', ',').split(',').reduce((accGame, cubes) => {
            const [value, cube] = cubes.replace(' ', '').split(' ')
            return { ...accGame, [cube]: max([accGame[cube], parseInt(value)])}
        }, { red: 0, green: 0, blue: 0 })

        return acc + (keys(setup).reduce((acc, key) => acc * setup[key], 1))
    }, 0)

    return (
        <div className="App">
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
