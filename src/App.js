import { useEffect, useState } from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard'

const cardList = [
{path: '/img/1.jpeg'},
{path: '/img/2.jpeg'},
{path: '/img/3.jpeg'},
{path: '/img/4.jpeg'},
{path: '/img/5.jpeg'},
{path: '/img/6.jpeg'},
];

function App() {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState({one: null, two: null});
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const handleSelected = (card) => {
    if(selectedCards.one === null){
      setSelectedCards({...selectedCards, one: card});
      card.flipped = true;
    }else if(selectedCards.two === null){
      setSelectedCards({...selectedCards, two: card});
      card.flipped = true;
      setDisabled(true);
    }else{
      return;
    }
  }
  const prepareCards = () => {
  const sortedCards = [...cardList]
  const doubleCards = [...sortedCards, ...sortedCards]
  .sort(() => Math.random() - 0.5)
  .map(( card, index ) => ({...card, id: index, flipped: false, matched: false}));
  setCards(doubleCards)
  resetStates();
  setScore(0);
  }
  
  const resetStates = () => {
    setSelectedCards({one: null, two: null});
    setDisabled(false);
    setScore(score + 1);
  }

  useEffect(() => {
  prepareCards();
  }, [])

  useEffect(() => {
    if(selectedCards.one && selectedCards.two){
      if(selectedCards.one.path === selectedCards.two.path){
        const newCards = [...cards];
        newCards[selectedCards.one.id].matched = true;
        newCards[selectedCards.two.id].matched = true;
        newCards[selectedCards.one.id].flipped = false;
        newCards[selectedCards.two.id].flipped = false;
        setCards(newCards);
        resetStates();
     }else{
       setTimeout(() => {
         const newCards = [...cards];
         newCards[selectedCards.one.id].flipped = false;
         newCards[selectedCards.two.id].flipped = false;
          setCards(newCards);
          resetStates();
       }, 1000);
      }
   }
  }, [selectedCards])

  return (
    <div className="container">
      <h1>Memory App</h1>
      <button className='btn' onClick={prepareCards}>Oyunu Başlat</button>
      <p>{ score }</p>
      <div className="card-grid">
        {
          cards.map((card, index) => (
            <MemoryCard 
            key={ index } 
            card={ card } 
            handleSelected={ handleSelected }
            disabled={ disabled }
            flipped={ card.flipped || card.matched }
            />
            ))
        }
     </div>
    </div>
  );
}

export default App;
