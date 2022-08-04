import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [values, setValues] = useState(Array(9).fill(""));
  const [winner, setWinner] = useState("");
  const [xo, setXo] = useState("X");
  const [over, setOver] = useState();

  const checkWinner = (dup) => {
    const combinations = {
      h: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
      ],
      v: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
      ],
      d: [
        [0, 4, 8],
        [2, 4, 6],
      ],
    };
    for (let combi in combinations) {
      combinations[combi].forEach((pattern) => {
        if (
          dup[pattern[0]] === "" ||
          dup[pattern[1]] === "" ||
          dup[pattern[2]] === ""
        ) {
        } else if (
          dup[pattern[0]] === dup[pattern[1]] &&
          dup[pattern[1]] === dup[pattern[2]]
        ) {
          setWinner(dup[pattern[0]]);
        }
      });
    }
  };

  const handleClick = (num) => {
    if (values[num] !== "") {
      return;
    }
    if(winner){
      return;
    }
    const dup = [...values];
    const temp = [...dup].sort()
    if(!temp.includes('',1)){
      setOver(true)
    }
    if (xo === "X") {
      setXo("O");
    } else {
      setXo("X");
    }
    dup[num] = xo;
    setValues(dup);
    checkWinner(dup);
  };

  const Cell = ({ num }) => {
    return <td onClick={() => handleClick(num)}>{values[num]}</td>;
  };

  const relaod = () => {
    setOver(false);
    setValues(Array(9).fill(""));
    setWinner("");
  };

  return (
    <div className="container">
    <div className="App">
      <h1 className="hea mb-3">Tic Tac Toe</h1>
      <table className="td">
        <tbody>
          <tr>
            <Cell num={0} />
            <Cell num={1} />
            <Cell num={2} />
          </tr>
          <tr>
            <Cell num={3} />
            <Cell num={4} />
            <Cell num={5} />
          </tr>
          <tr>
            <Cell num={6} />
            <Cell num={7} />
            <Cell num={8} />
          </tr>
        </tbody>
      </table>
      <div className="winner">
        {winner && (
          <>
           <Alert variant="success">WINNER : {winner}</Alert>
            <Button onClick={relaod} className="m-4" variant="outline-danger">
              &#8635;
            </Button>
          </>
        )}
        {
          over && !winner && 
          <> 
          <Alert variant="danger">
            Try Again!
          </Alert>
           <Button onClick={relaod} className="m-4" variant="outline-danger">
           &#8635;
         </Button>
         </>

        }
      </div>
      </div>
    </div>
  );
}

export default App;