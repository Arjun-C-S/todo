import "./App.css";
import { useState } from "react";
import { useRef } from "react";

function App() {
  const [toDos, setToDos] = useState([]);
  let [toDo, setToDo] = useState("");
  const inputRef = useRef(null);

  //onClick Add button

  function addTask() {
    if(toDo.length > 0)
    {
      setToDos([
        ...toDos,
        {
          key: Date.now(),
          text: toDo,
          status: false,
          removeStatus: false,
          completedStatus: false,
        },
      ]);
      setToDo("");
    }
    else
    {
      inputRef.current.style.border = '2px solid red'
      inputRef.current.style.boxShadow = '0 3px 10px rgb(242 3 3 / 79%)';
      setTimeout(() => {
        inputRef.current.style.border = '0'
        inputRef.current.style.boxShadow = '0 0px 0px rgb(0 0 0 / 0%)'
      }, 2000);
    }
  }

  //onclick enter function

  function onEnter(e) {
    if (e.key === "Enter") {
      if (toDo.length > 0) {
        setToDos([
          ...toDos,
          {
            key: Date.now(),
            text: toDo,
            status: false,
            removeStatus: false,
            completedStatus: false,
          },
        ]);
        setToDo("");
      }
      else
      {
        inputRef.current.style.border = '2px solid red'
        inputRef.current.style.boxShadow = '0 3px 10px rgb(242 3 3 / 79%)';
        setTimeout(() => {
          inputRef.current.style.border = '0'
          inputRef.current.style.boxShadow = '0 0px 0px rgb(0 0 0 / 0%)'
        }, 2000);
        }
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">Todo List</div>
        <div className="textInput" ref={inputRef}>
          <input
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            onKeyPress={(e) => {
              onEnter(e);
            }}
            type="text"
            className="toDotext"
            placeholder="Write something here 🖋️"
          />
          <button
            onClick={addTask}
            className="btn-addToList"
          >
            Add to List
          </button>
        </div>
        <div className="details">
          <div className="inToDoList">
            <div className="inToDoListHeader">
              <h4>Task to Complete</h4>
            </div>
            <div className="inToDoListBody">
              {toDos.map((obj) => {
                if (
                  obj.removeStatus === false &&
                  obj.completedStatus === false
                ) {
                  return (
                    <div className="toDoListTask">
                      <div className="btn-icons">
                        <div className="delete">
                          <div
                            onClick={() => {
                              toDos.forEach((obj2) => {
                                if (obj2.key === obj.key) {
                                  setToDos([
                                    ...toDos,
                                    (obj.removeStatus = true),
                                  ]);
                                }
                              });
                            }}
                            className="close-right"
                          >
                            <i className="fas fa-times close-icon"></i>
                          </div>
                        </div>
                        <div className="complete">
                          <div
                            onClick={() => {
                              toDos.forEach((obj2) => {
                                if (obj2.key === obj.key) {
                                  setToDos([
                                    ...toDos,
                                    (obj.completedStatus = true),
                                  ]);
                                }
                              });
                            }}
                            className="complete-right"
                          >
                            <i className="fa-solid fa-check complete-icon"></i>
                          </div>
                        </div>
                      </div>
                      <h4 className="toDoListText">{obj.text}</h4>
                    </div>
                  );
                } else {
                  return "";
                }
              })}
            </div>
          </div>
          <div className="CompltedTasks">
            <div className="CompletedFromToDoHeader">
              <h4>Completed Tasks</h4>
            </div>
            <div className="CompletedFromToDoBody">
              {toDos.map((obj) => {
                if (obj.completedStatus === true) {
                  return (
                    <div className="toDoListCompletedTask">
                      <div className="PermenantDelete">
                        <div
                          onClick={() => {
                            let toDoCopy = [];
                            toDos.forEach((obj2) => {
                              if (obj2.key !== obj.key) {
                                toDoCopy.push(obj2);
                              }
                            });
                            setToDos(toDoCopy);
                          }}
                          className="permanantDelete-right"
                        >
                          <i className="fa-solid fa-trash permanantDelete-icon"></i>
                        </div>
                      </div>
                      <h4 className="toDoListDeletedText">{obj.text}</h4>
                    </div>
                  );
                } else {
                  return "";
                }
              })}
            </div>
          </div>
          <div className="removedFromtoDo">
            <div className="removedFromToDoHeader">
              <h4>Removed from todo</h4>
            </div>
            <div className="removedFromToDoBody">
              {toDos.map((obj) => {
                if (obj.removeStatus === true) {
                  return (
                    <div className="toDoListRemoveTask">
                      <div className="restore">
                        <div
                          onClick={() => {
                            toDos.forEach((obj2) => {
                              if (obj2.key === obj.key) {
                                setToDos([
                                  ...toDos,
                                  (obj.removeStatus = false),
                                ]);
                              }
                            });
                          }}
                          className="restore-right"
                        >
                          <i className="fa-solid fa-rotate restore-icon"></i>
                        </div>
                      </div>
                      <h4 className="toDoListRemoveText">{obj.text}</h4>
                    </div>
                  );
                } else {
                  return "";
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
