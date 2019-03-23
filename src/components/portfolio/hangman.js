import React, { Component } from 'react';
import { Input, Button, Menu, Dropdown, Icon, Select, Alert, message } from 'antd';

const Option = Select.Option;
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

class Hangman extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mistakes: 0,
      word: '',
      correctLetters: [],
      pickedLetters: [],
      showHideWord: 'black',
      blockWordInput: false,
      blockLetterInput: true
    }
  }

  handleClick = () => {
    this.restartGame();
  }

  handleStartBtn = () => {
    if (this.state.word === '') {
      alert('Your word should have at least 2 letters!');
    } else {
      this.setState({
        blockWordInput: true,
        blockLetterInput: false
      });
    }
  }

  handleChange = (pickedLetter) => {
    let pickedLetters = this.state.pickedLetters.concat(pickedLetter);
    this.setState({
      pickedLetters
    });
    this.checkIfWordContainsLetter(pickedLetter)
  }

  restartGame = () => {
    this.setState({
      mistakes: 0,
      word: '',
      correctLetters: [],
      pickedLetters: [],
      showHideWord: 'black',
      blockWordInput: false,
      blockLetterInput: true
    });
  }

  checkIfLetterIsPickable = (letter) => {
    let pickedLetters = this.state.pickedLetters;
    return (pickedLetters.indexOf(letter) !== -1);
  }

  checkIfGameWin = () => {
    let correctLetters = this.state.correctLetters.join("");
    return ((this.state.word === correctLetters) && correctLetters.length > 0) ? true : false;
  }

  checkIfGameOver = () => {
    return this.state.mistakes === 6 ? true : false;
  }

  checkIfWordContainsLetter = (letter) => {
    let word = this.state.word.split('');
    let correctLetters = this.state.correctLetters;
    let mistakes = this.state.mistakes;
    if (word.indexOf(letter) === -1) {
      mistakes++;
    } else {
      word.forEach((wordLetter, index) => {
        if (letter === wordLetter) {
          correctLetters[index] = letter;
        }
      });
    }
    this.setState({
      correctLetters,
      mistakes
    });
    if ((this.checkIfGameWin() || this.checkIfGameOver())) {
      this.setState({ blockLetterInput: true })
    }
  }

  onInputChange = (ev) => {
    let word = ev.target.value;
    let correctLetters = [];
    for (let i = 0; i < word.length; i++) {
      correctLetters.push('');
    }
    this.setState({
      word,
      correctLetters
    });
  }

  setInputValue = (blockWordInput) => {
    if (blockWordInput) {
      return '';
    } else {
      return this.state.word;
    }
  }

  renderWordInput = () => {
    let blockWordInput = this.state.blockWordInput;
    let inputValue = this.setInputValue(blockWordInput);
    return (
      <div className="word-input">
        <Button onClick={this.restartGame}>restart</Button>
        <Input
          size="small" placeholder="Choose a word" value={inputValue} onChange={this.onInputChange}
          disabled={blockWordInput}
        />
        <Button onClick={this.handleStartBtn} disabled={blockWordInput}>start</Button>
      </div>
    );
  }

  renderImage = () => {
    let image = '';
    if (this.checkIfGameWin()) {
      image = 'images/gamewin.png';
    } else {
      image = `images/forca${this.state.mistakes}.jpg`;
    }
    return (
      <figure className="hangman-figure">
        <img className="balloon-img" src={image} alt="Gallow" />
      </figure>
    );
  }

  renderGameInfo = () => {
    return (
      <React.Fragment>
        {this.renderImage()}
        <div>
          Mistakes: <span>{this.state.mistakes}</span>
          <br></br>
          Picked letters: <span>{this.state.pickedLetters.join(', ')}</span>
        </div>
      </React.Fragment>
    );
  }

  renderPickedWord = () => {
    let correctLetters = this.state.correctLetters;
    return (
      <div className="correctletters-placer">
        {correctLetters.map((letter, index) => (
          <div className="letter-placer" key={index} style={{ borderBottom: "1px solid black" }}>
            {letter}
          </div>)
        )}
      </div>
    );
  }

  renderLetterPicker = () => {
    let letters = ALPHABET.slice(0).split("");
    const options = letters.map(letter => (
      <Option key={letter} value={letter} disabled={this.checkIfLetterIsPickable(letter)}>{letter}</Option>
    ));
    if (!this.state.blockLetterInput) {
      return (
        <Select style={{ width: '100%' }} onChange={(value) => this.handleChange(value)} disabled={this.state.blockLetterInput}>
          {options}
        </Select>
      );
    }
  }

  render() {
    return (
      <div className="hangman-wrapper modals-background">
        <div className="left-wrapper">
          <div className="left-one">
            {this.renderWordInput()}
          </div>
          <div className="left-two">
            {this.renderGameInfo()}
            {this.renderPickedWord()}
          </div>
        </div>
        <div className="right-wrapper">
          {this.renderLetterPicker()}
        </div>
      </div>
    );
  }
}

export default Hangman;