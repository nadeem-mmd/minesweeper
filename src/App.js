import './App.css';
import React, { useState } from "react"
import { cloneDeep } from "lodash"

function App() {
  const arr = [
    { mId: 0, values: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }] },
    { mId: 1, values: [{ id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }] },
    { mId: 2, values: [{ id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }] },
    { mId: 3, values: [{ id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }] },
    { mId: 4, values: [{ id: 21 }, { id: 22 }, { id: 23 }, { id: 24 }, { id: 25 }] }];

  for (let obj of arr) {
    for (let obj1 of obj.values) {
      obj1.val = Math.round(Math.random() * 9) || 1;
      obj1.disp = false;
    }
  }

  const [mines, setMines] = useState(arr);
  const clickHandler = (id, mId) => {
    let val;
    for (let arr1 of mines) {
      let isTrue = false;
      val = arr1.values.findIndex((arr2) => {
        if (id === arr2.id) {
          isTrue = true;
          return true;
        }
        return false;
      })
      if (isTrue)
        break;
    }
    const newMines = cloneDeep(mines)
    const remMine = newMines.splice(mId, 1);
    remMine[0].values[val].disp = true;
    if (remMine[0].values[val].val < 3) {
      remMine[0].values[val].val = '*';
      setTimeout(() => {
        window.confirm('OOPS!! game over')
        setMines(arr);
        return;
      }, 0);
    }
    newMines.push({ ...remMine[0] });
    newMines.sort((a, b) => {
      return a.mId - b.mId;
    })
    setMines(newMines);
  }

  return (
    <div className="App-header">
      {mines.map((obj, i) => {
        return (
          <div className="row" key={obj + i}>
            {obj.values.map((val, i) => {
              return (
                <span className="mine" key={val.id + obj + i} onClick={() => clickHandler(val.id, obj.mId)}>{val.disp ? val.val : '.'}</span>
              )
            })}
          </div>
        )
      })}
    </div>
  );
}

export default App;
