import './App.css';
import React from 'react'
import Answer1 from './components/answer1/Answer1';
import Answer2 from './components/answer2/Answer2';

const App = ({
}) => {
    return (
        <div className="App">
            <Answer1 />
            <Answer2 />
        </div>
    )
}

export default App;
