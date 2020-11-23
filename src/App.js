import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import JustinCard from "./components/JustinCard";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import justins from "./justins.json";
import './App.css';

class App extends React.Component {
  state = {
    justins,
    message: "Click a Justin to get started!",
    score: 0,
    topscore: 0
  };

  shuffle = data => {
    let i = data.length - 1;
    while (i > 0) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = data[i];
      data[i] = data[j];
      data[j] = temp;
      i--;
    }
    return data;
  };

  reset = (justins) => {
    const resetData = justins.map(item => ({ ...item, clicked: false }));
    return this.shuffle(resetData);
  };

  checkJustin = id => {
    let guessedCorrectly = false;
    const newData = this.state.justins.map(item => {
      const newItem = { ...item };
      if (newItem.id === id) {
        if (!newItem.clicked) {
          newItem.clicked = true;
          guessedCorrectly = true;
        }
      }
      return newItem;
    });
    if (guessedCorrectly === true) {
      const { topscore, score } = this.state;
      const newScore = score + 1;
      const newTopScore = Math.max(newScore, topscore);
      if (newScore === 12) {
        this.setState({
          justins: this.reset(newData),
          message: "You won!",
          score: 0,
          topscore: newTopScore
        });
      } else {
        this.setState({
          justins: this.shuffle(newData),
          message: "You guessed correctly!",
          score: newScore,
          topscore: newTopScore
        });
      }
    } else {
      this.setState({
        justins: this.reset(newData),
        message: "You lose! Click a Justin to play again!",
        score: 0
      });
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar
            message={this.state.message}
            score={this.state.score}
            topscore={this.state.topscore}
          />
          <Wrapper>
            {this.state.justins.map(justin => (
              <JustinCard
                checkJustin={this.checkJustin}
                {...justin}
              />
            ))}
          </Wrapper>
        </div>
      </Router>
    );
  }
}

export default App;