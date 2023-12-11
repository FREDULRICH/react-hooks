/* eslint-disable no-undef */
// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react';
import { useState , useEffect} from 'react';
import '../styles.css';

import { useLocalStorageState } from '../utils';




function Board() {
  // 🐨 squares is the state for this component. Add useState for squares 
  
  // stockage dans le localstorage quand changement
   const [squares, setSquares] = useLocalStorageState ('squares',Array(9).fill(null),);
  
  // - winner ('X', 'O', or null)
  const winnerIs = CalculateWinner (squares);
    
  // - nextValue ('X' or 'O')
  const nextValue = calculateNextValue (squares);
  
   //tabHisto
   const [tabHisto, setTabHisto] = useState ([]);
  

  // This is the function your square click handler will call. `square` should
  // be an index. So if they click the center square, this will be `4`.
  function selectSquare(square) {
  
    let HistoTemp = [...tabHisto];
    let squareTemp = [...squares];
    
    if ((squareTemp[square]==null) )
    {
        // 🐨 set the value of the square that was selected
        // 💰 `squaresCopy[square] = nextValue`
        squareTemp[square]= nextValue;

       
      // Mise à jour de l'historique
      HistoTemp.push ([ [...squareTemp], nextValue]);
      setTabHisto (HistoTemp );
    
      // 🐨 set the squares to your copy
      setSquares (squareTemp);
      
      
    }  
    
  };

 
function affichejeu ()
{
  return (
    <div> Les coups joués
      <ul>
        
        {tabHisto.map ((item,index) => (
          <li key = {index}> 
         {index < tabHisto.length ? (
          <button onClick={() => restartFrom(index)}> Reprendre </button>): null}
           {`   ${item[0]} [ ${item[1]} ]` } 
          </li> 
        ))
        }
      </ul>
    </div>
  )
}


 function restart() {
    // 🐨 reset the squares
    // 💰 `Array(9).fill(null)` will do it!
    setSquares (Array(9).fill(null))
    setTabHisto([]);
  }

function restartFrom (index) 
{
  
  const historySlice  = tabHisto.slice(0, index +1);

  // Obtenez le dernier élément de l'historique pour obtenir l'état du jeu à cet index
  const [squaresReprend, nextValueReprend] = historySlice[historySlice.length - 1];

  setSquares (squaresReprend);


  // Mettez à jour l'historique pour correspondre à l'historique jusqu'à l'index spécifié
  setTabHisto(historySlice);
  
};

  function renderSquare(i) {
    return (
      <button style={{ backgroundColor: (winnerIs!==null?
                                           (winnerIs[1].includes(i)?'green':'white')
                                           :'white')}} 
      
      
        className="square" onClick={() => selectSquare(i)} disabled={winnerIs!==null}  >
        {squares[i]}  
      </button>
       
    )
  };

 
  return (

   <div className="game1">

    <div className='lagrille' >

      {/* 🐨 put the status in the div below */}
      <div className="status">Status :
        <div> 
         {CalculateStatus (winnerIs,squares, nextValue)}
        </div>
      </div>
      
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
        {/*(winnerIs!==null? `Gagne ${winnerIs[1].includes(0)}` : null)*/}
      </button>
     </div> 

     <div className='game-histo'> 
        {affichejeu()}
      </div>


    </div>
    
  )
};



// eslint-disable-next-line no-unused-vars
function CalculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner[0]}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}


// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}



// eslint-disable-next-line no-unused-vars
function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return ([squares[a],lines[i]])
    }
  }
  return null
}

function App() {
  return <Board />
}

export default App
