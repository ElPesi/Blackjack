import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blackjack.css"; 

const Blackjack = () => {
  const [deckId, setDeckId] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Solicita un nuevo mazo al cargar el componente
    const fetchDeck = async () => {
      try {
        const response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/");
        setDeckId(response.data.deck_id);
      } catch (error) {
        console.error("Error fetching deck:", error);
      }
    };
    fetchDeck();
  }, []);

  const drawCards = async () => {
    if (!deckId) return;

    try {
      // Saca dos cartas del mazo
      const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
      setCards(response.data.cards);
    } catch (error) {
      console.error("Error drawing cards:", error);
    }
  };

  return (
    <div className="blackjack-container">
      <h1>Blackjack</h1>
      <button onClick={drawCards}>Draw Cards</button>
      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.code} className="card">
            <img src={card.image} alt={card.value + " OF " + card.suit} />
            <p>{card.value} OF {card.suit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blackjack;
