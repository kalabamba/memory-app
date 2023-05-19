import React from 'react'
import './MemoryCard.css'

const MemoryCard = ({ card, handleSelected, disabled, flipped }) => {
	const handleClick = (e) => {
		if(!disabled && !card.flipped) {
			handleSelected(card);
		}
	}

  return (
	<div className="card">
		<div className={flipped ? "flipped":""}>
			<img className='cardFront' src={card.path} alt="" />
			<img className='cardBack' onClick={ handleClick } src="/img/cover.jpeg" alt="" />
		</div>
    </div>
  )
}

export default MemoryCard