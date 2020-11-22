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

  shuffle = (array) => array.sort(() => Math.random() - 0.5);

  reset = (justins) => {
    for (var i = 0; i < justins.length; i++) {
      justins[i].clicked = false;
    }
    this.setState({
      justins
    });
  }

  endGame = () => {
    this.setState({
      justins,
      message: "You lose! Click a Justin to play again!",
      score: 0
    });
    this.reset(justins);
  }

  winGame = () => {
    this.setState({
      justins,
      message: "You win! Click a Justin to play again!",
      score: 0
    });
    this.reset(justins);
  }

  topScore = (score) => {
    if (this.state.topscore <= score - 1) {
      return true;
    }
  }

  checkJustin = id => {
    if (this.state.score === 12) {
      this.winGame();
    }
    if (justins[id - 1].clicked === false) {
      justins[id - 1].clicked = true;
      this.shuffle(justins);
      this.setState({
        justins,
        message: "You guessed correctly!",
        score: this.state.score + 1,
      });
      if (this.state.topscore <= this.state.score) {
        this.setState({
          topscore: this.state.topscore + 1
        });
      }
      return justins[id - 1].clicked;
    }
    this.endGame();
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