import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import './Deck.css';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: response.data });
  }

  async getCard() {
    const id = this.state.deck.deck_id;
    try {
      const newURL = `${API_BASE_URL}/${id}/draw/`;
      const newDeck = await axios.get(newURL);
      if (newDeck.data.success === false) {
        throw new Error('No cards left!!!');
      }
      console.log(newDeck.data);
      let card = newDeck.data.cards[0];
      this.setState((st) => ({
        drawn: [
          ...st.drawn,
          {
            cardNum: st.drawn.length,
            id: card.code,
            cardImg: card.image,
            name: `${card.value} of ${card.suit}`,
          },
        ],
      }));
    } catch (err) {
      alert(err);
    }
  }

  render() {
    const cards = this.state.drawn.map((card) => (
      <Card key={card.id} cardImg={card.cardImg} name={card.name} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">💎 Card Dealer 💎</h1>
        <h2 className="Deck-title subtitle">
          💎 A little demo made with React 💎
        </h2>
        <button className="Deck-btn" onClick={this.getCard}>
          Give me a card
        </button>
        <div className="Deck-area">{cards}</div>
      </div>
    );
  }
}

export default Deck;
