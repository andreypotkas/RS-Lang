import { Word } from '../service/interfaces';
import { getRandom } from '../utils/sprintUtils';
import Game from './abstract/game';

class Sprint extends Game {
  currentQuestion: number;
  correctAnswers: number;
  incorrectAnswers: number;
  gameData: Word[];
  correctness: boolean;
  totalScore: number;
  correctStreak: number;
  gameTime: number;

  constructor() {
    super('Sprint');
    this.currentQuestion = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.gameData = [];
    this.correctness = false;
    this.totalScore = 0;
    this.correctStreak = 0;
    this.gameTime = 60;
  }

  startGame(gameData: Word[]): void {
    this.setGameData(gameData);
    this.render();
    this.initHandlers();
    this.generateQuestion();
    this.runTimer();
  }

  render(): void {
    const appContainer = document.getElementById('app');
    const gameHtml = `
    <div id="gameContainer">
      <div id="game">
        <div>Welcome to ${this.name} game!</div>
        <div id="sprint-timer">0</div>
        <div>score:<span id="total-score">${this.totalScore}</span></div>
        <div id="correct-answers-series"><span>length correct answers:</span>1</div>
        <div id="score-increase">0</div>
        <div id="questionNumber">0</div>
        <div id="correctCounter">Correct Answers: 0</div>
        <div id="incorrectCounter">Incorrect Answers: 0</div>
        <div id="sprint-question"></div>
        <div id="sprint-question-translate"></div>
        <div id="answerButtons">
          <button id="correct-answer-sprint-btn">correct</button>
          <button id="incorrect-answer-sprint-btn">incorrect</button>
        </div>
      </div>
    </div>
  `;
    (appContainer as HTMLElement).innerHTML = gameHtml;
  }

  generateQuestion(): void {
    const question = document.getElementById('sprint-question') as HTMLDivElement;
    const translateQuestion = document.getElementById('sprint-question-translate') as HTMLDivElement;

    question.innerText = this.gameData[this.currentQuestion].word;

    if (getRandom(100) > 50) {
      translateQuestion.innerText = this.gameData[getRandom(20)].wordTranslate;
      this.correctness = false;
    } else {
      translateQuestion.innerText = this.gameData[this.currentQuestion].wordTranslate;
      this.correctness = true;
    }

    const counter = document.getElementById('questionNumber') as HTMLElement;
    counter.innerText = `Current question is ${this.currentQuestion}`;
  }

  answer(event: Event): void {
    const element = event.target as HTMLElement;
    if ((element.id === 'correct-answer-sprint-btn' && this.correctness === true)
    || (element.id === 'incorrect-answer-sprint-btn' && this.correctness === false)) {
      if (this.correctStreak < 3) this.correctStreak += 1;
      this.registerCorrectAnswer();
      this.updateScore(this.correctStreak);
    } else {
      this.correctStreak = 0;
      this.registerIncorrectAnswer();
    }
    this.currentQuestion++;
    this.generateQuestion();
  }

  initHandlers(): void {
    const btnContainer = document.getElementById('answerButtons') as HTMLElement;
    Array.from((btnContainer.children)).forEach((btn) => btn.addEventListener('click', this.answer.bind(this)));
  }

  showResults(): void {
    const appContainer = document.getElementById('app');
    const resultsHtml = `
    <div id="resultsContainer">
      <div>Results page for ${this.name} game</div>
      <div>Correct Answers: ${this.correctAnswers}</div>
      <div>Incorrect Answers: ${this.incorrectAnswers}</div>
    </div>
  `;
    (appContainer as HTMLElement).innerHTML = resultsHtml;
  }

  registerCorrectAnswer(): void {
    const counter = document.getElementById('correctCounter') as HTMLElement;
    this.correctAnswers++;
    counter.innerText = `Correct Answers: ${this.correctAnswers}`;
    // + send statistics
  }

  registerIncorrectAnswer(): void {
    const counter = document.getElementById('incorrectCounter') as HTMLElement;
    this.incorrectAnswers++;
    counter.innerText = `Incorrect Answers: ${this.incorrectAnswers}`;
    // + send statistics
  }
  runTimer(): void {
    const sprintTimer = document.getElementById('sprint-timer') as HTMLElement;
    const timer = setInterval(() => {
      this.gameTime -= 1;
      sprintTimer.innerHTML = String(this.gameTime);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      this.showResults();
    }, 60000);
  }
  updateScore(streak: number): void {
    const score = document.getElementById('total-score') as HTMLElement;
    const scoreIncrease = document.getElementById('score-increase') as HTMLElement;

    switch (streak) {
      case 0: this.totalScore += 10; scoreIncrease.innerHTML = '+10 points per answer'; break;
      case 1: this.totalScore += 20; scoreIncrease.innerHTML = '+20 points per answer'; break;
      case 2: this.totalScore += 30; scoreIncrease.innerHTML = '+30 points per answer'; break;
      default: this.totalScore += 40; scoreIncrease.innerHTML = '+40 points per answer';
    }
    score.innerHTML = String(this.totalScore);
  }
  setGameData(words: Word[]): void {
    this.gameData = words;
  }
}

export default Sprint;