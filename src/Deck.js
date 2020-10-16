import React, { Component } from 'react';
import axios from 'axios';
const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = { deck: null };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState({ deck: response.data });
  }

  async getCard() {
    const id = this.state.deck.deck_id;
    const newURL = `${API_BASE_URL}/${id}/draw/`;
    const newDeck = await axios.get(newURL);
    console.log(newDeck.data);
  }

  render() {
    return (
      <div>
        <h1>Card Dealer</h1>
        <button onClick={this.getCard}>Give me a card</button>
      </div>
    );
  }
}

export default Deck;
