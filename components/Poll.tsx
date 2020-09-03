
import React, { useState } from 'react'
import styled from 'styled-components';
import { QandAsDocument } from '../types';
import SVG from '../doc/icon.js';


type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};

const PollWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const PollContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  border-radius: 4px;
`;
const PollQuestion = styled.h3`
  margin: auto;
`;
const PollAnswer = styled.li`
  border: solid 1px #D4D4D4;
  border-radius: 4px;
  cursor: pointer;
`;
const PollVotes = styled.span`
 color: #CCCCCC;
 font-size: 14px;
`;

const PollData = styled.div `
  display: flex;
  justify-content: space-between;
  padding: 6px;
`;

export default function Poll({ qandas }: Props) {
  const [isAnswered, setAnswer] = useState(false);
  const [qandasState, setNewQuandas] = useState(qandas);
  const [questionNumber, setQuestionNumber] = useState(Math.floor(Math.random() * (qandas.questions.length - 1)) + 1);
  const [highestVote, setHighestVote] = useState(0);
  const [myVote, setMyVote] = useState(0)

  const chooseAnswer = (answer: any) => {
    setAnswer(true);
    const qandasStateCopy = qandasState;
    let highest = [];
    for(let i in qandasStateCopy.questions[questionNumber].answers) {
      highest.push(qandasStateCopy.questions[questionNumber].answers[i].votes);
      if (qandasStateCopy.questions[questionNumber].answers[i].text === answer.text) {
        qandasStateCopy.questions[questionNumber].answers[i].votes ++;
        setMyVote(parseInt(i));
      } 
      let index: any = highest.indexOf(Math.max(...highest));
      setHighestVote(index);
      setNewQuandas(qandasStateCopy)
    }
  };
  const votes = qandasState.questions[questionNumber].answers.map(i => i.votes).reduce((a , b) => {return a + b});
  return (
    <PollWrapper>
      <PollContainer>
        <PollQuestion>{qandasState.questions[questionNumber].question.text}</PollQuestion>
        {qandasState.questions[questionNumber].answers.map((answer, index) => (
          <PollAnswer key={index}>
             {isAnswered ?  <PollData style={{'background': `linear-gradient(90deg, ${highestVote === index ? '#A2FFF4': '#E8E8E8'} ,${Math.round((answer.votes/votes)*100)}%, #FFFF ${(Math.round((answer.votes/votes)*100))}%)`}}> <span>{answer.text} {myVote === index &&<SVG></SVG>}</span> <span>{`${Math.round((answer.votes/votes)*100)}%`}</span></PollData> : <PollData onClick={() => chooseAnswer(answer)}>{answer.text}</PollData>}
          </PollAnswer>
        ))}
        <PollVotes>
          {`${votes} votes`}
        </PollVotes>
      </PollContainer>
    </PollWrapper>
    );
}
