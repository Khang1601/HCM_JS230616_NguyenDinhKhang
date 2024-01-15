import React from 'react'
import { useState } from 'react'
import './style.scss'
import Addplayer from './Addplayer'
import Scores from './Scores'
import Players from './Players'

export default function Scoreboard() {

  const [doList, setDoList] = useState([
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

  function addList(e: any) {
    e.preventDefault();
    if (e.target.title.value == "") {
      console.log("Xin hãy nhập vào");
      return
    }

    let newDo = {
      id: Date.now() * Math.random(),
      title: e.target.title.value,
      status: false,
      score: 0
    }
    setDoList([newDo, ...doList]);
    e.target.title.value = '';
  }

  function deleteDo(doId : any, index: any) {
    setDoList(doList.filter(doItemFilter => doItemFilter.id != doId))
  }

  console.log("tổng player: ", doList.length);

  if (doList.length == 0) {
    setTimeout(() => {
      alert("Bạn đã xóa hết người chơi!")
    }, 500)
  }

  function increaseCount(doId: any) {
    const updateList = doList.map((doItem) => {
      if (doItem.id === doId && doItem.score < 10) {
        return { ...doItem, score: doItem.score + 1 };
      }
      return doItem;
    });
    setDoList(updateList);
  }

  function decreaseCount(doId: any) {
    const updateList = doList.map((doItem) => {
      if (doItem.id === doId && doItem.score > 0) {
        console.log(doItem);
        return { ...doItem, score: doItem.score - 1 };
      }

      return doItem;
    });
    setDoList(updateList);
  }

  const highestScore = Math.max(...doList.map((doItem) => doItem.score));
  // console.log("highestScore",highestScore);
  function isHighestScore(highest: any) {
    return highest > 0 && highest === highestScore;
  }

  const totalScore = doList.reduce((acc, doItem) => acc + doItem.score, 0);
  // console.log("totalScore",totalScore);

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



    </div>
  )
}
