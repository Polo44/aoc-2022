import './App.css';
import React from 'react'
import Answer1 from './components/2023/answer1/Answer1';
import Answer2 from './components/2023/answer2/Answer2';
import Answer4 from './components/2023/answer4/Answer4';
import Answer5 from './components/2023/answer5/Answer5';

const App = () => {
    return (
        <div className="App">
            <Answer1 />
            <Answer2 />
            <Answer4 />
            <Answer5 />
        </div>
    )
}

export default App;
