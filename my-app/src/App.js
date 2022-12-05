import './App.css';
import React from 'react'
import Answer1 from './components/answer1/Answer1';
import Answer2 from './components/answer2/Answer2';
import Answer3 from './components/answer3/Answer3';
import Answer4 from './components/answer4/Answer4';
import Answer5 from './components/answer5/Answer5';

const App = ({
}) => {
    return (
        <div className="App">
            <Answer1 />
            <Answer2 />
            <Answer3 />
            <Answer4 />
            <Answer5 />
        </div>
    )
}

export default App;
