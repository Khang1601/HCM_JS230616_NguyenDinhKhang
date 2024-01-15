import React from 'react'
import { useState, useEffect } from 'react'
import { Player } from '../interfaces/user.interface';
import './style.scss'

export default function Scoreboard () {

  useEffect(() => {
    const storeDoList = localStorage.getItem('doList');

    if (storeDoList) {
      setDoList(JSON.parse(storeDoList));
    }
  }, []);

  const [doList, setDoList] = useState<Player[]>([
    {
      id: Date.now() * Math.random(),
      title: "Long Lung Linh",
      status: false,
      score: 0
    },
    {
      id: Date.now() * Math.random(),
      title: "Hứa Minh Cường",
      status: false,
      score: 0
    },
    {
      id: Date.now() * Math.random(),
      title: "Y Khoc",
      status: false,
      score: 0
    }
  ])

  function addPlayer(e: any) {
    e.preventDefault();
    if (e.target.title.value == "") {
      console.log("Xin đừng để trống");
      alert("Xin đừng để trống");
      return
    }

    let newDo: Player = {
      id: Date.now() * Math.random(),
      title: e.target.title.value,
      status: false,
      score: 0
    }
    setDoList([newDo, ...doList]);

    e.target.title.value = '';
  }

  function deletePlayer(doId: number) {
    setDoList(doList.filter(doItemFilter => doItemFilter.id != doId))
  }

  console.log("tổng player: ", doList.length);

  if (doList.length == 0) {
    setTimeout(() => {
      console.log("Bạn đã xóa hết người chơi!");
      alert("Bạn đã xóa hết người chơi!");
    }, 500)
  }

  function increaseCount(doId: number) {
    const updateList = doList.map((doItem) => {
      
      if (doItem.id == doId && doItem.score < 10) {
        return { ...doItem, score: doItem.score + 1 };
      }
      return doItem;

    });

    setDoList(updateList);
  }

  function decreaseCount(doId: number) {
    const updateList = doList.map((doItem) => {

      if (doItem.id == doId && doItem.score > 0) {
        console.log(doItem);
        return { ...doItem, score: doItem.score - 1 };
      }

      return doItem;
    });

    setDoList(updateList);
  }

  const highestScore = Math.max(...doList.map((doItem) => doItem.score));
  function isHighestScore(highest: number) {
    return highest > 0 && highest == highestScore;
  }

  const totalScore = doList.reduce((acc, doItem) => acc + doItem.score, 0);


  useEffect(() => {
    localStorage.setItem('doList', JSON.stringify(doList));
  }, [doList]);

  return (
    <div className='container'>

      {/* ==============Scores=================== */}
      <div className='scores'>
        <div>
          <div className='player'>
            <span>Players: </span>
            <span className='player_number'>{doList.length}</span>
          </div>

          <div className='point'>
            <span>Total Points: </span>
            <span className='point_number'>{totalScore}</span>
          </div>
        </div>

        <h1>Bảng điểm</h1>
      </div>

      {/* ==============Players=================== */}
      <div className='players'>
        <ul>
          {
            doList.map((doItem, index) => (
              <li key={doItem.id}>
                <div className='li_1'>
                  <button className='btn_delete' onClick={() => {
                    deletePlayer(doItem.id)
                  }}>
                    <i className="fa-solid fa-x"></i>
                  </button>

                  <i className="fa-solid fa-crown"
                    style={{
                      opacity: isHighestScore(doItem.score) ? 0.6 : 0.08,
                      transitionDelay: isHighestScore(doItem.score) ? '0.5s' : ''
                    }}
                  ></i>

                  <span>{doItem.title}</span>
                </div>

                <div className='li_2'>
                  <div>
                    <button className='btn_decrease' onClick={() =>
                      decreaseCount(doItem.id)
                    }>
                      <i className="fa-solid fa-minus"></i>
                    </button>
                  </div>

                  <span>{doItem.score}</span>

                  <button className='btn_increase' onClick={() =>
                    increaseCount(doItem.id)
                  }>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </li>

            ))
          }
        </ul>
      </div>

      {/* ==============Addplayer=================== */}
      <div className='add_player'>
            <form className='form_input' onSubmit={(e) => {
                addPlayer(e)
            }}>
                <input name='title' type="text" placeholder="Enter a player's name" />
                <button>ADD PLAYER</button>
            </form>
        </div>

    </div>
  )
}
