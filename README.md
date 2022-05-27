
# RS-Lang

- :video_game: Single-page application game for learning english.
- :cat:Functionality is taken from the lingualeo application.
- :two_men_holding_hands: It's team task. Our team included 2 people.
Written in classes using typescript without frameworks. 


## Description
In the application 2 similar games. For games, a common class has been created that combines the same functionality of two games. Differences are taken out in classes heirs. Game results are stored in class instances. There are volume and timer settings in Settings class.
Use:
- classes
- without frameworks
- webpack
- typescript 
- es-lint
- classes, inheritance
- objects
- arrays, filter, forEach..
- functions, arrow func, bind
- events
- work with DOM
- work with timer and audio
- work with REST API
- Promises

## Functional
The application has pages:
- main - contains a description of the application's features
- book:
  - contains pagination
  - when switching pages, new words are loaded from the backend
  - on the card it is possible to mark words as difficult 
  - there is a page with only difficult words
  - the progress of learning the word is displayed on the card
- games - 2 games Sprint, AudioChallenge
  - with the correct guessing word in the game, the progress of learning word increases
  - 3 correct answers, the words become learned
  - The progress of learning words is also stored on the backend
- statistics
  - page displayed only if the user is logged in
  - shows the number of correct and incorrect answers in each game, shedules of learned words by day
- authorization
  - signup
  - signin

##### Use scss preprocessor for styling.
##### Project build using webpack.

## Deploy
- App:
- :globe_with_meridians: https://andreypotkas-rs-lang.netlify.app/
- Deploy backend application on mongoDB. Swagger with endpoints:
- :globe_with_meridians: https://rs-lang-application.herokuapp.com/doc/#/

### Easy to use:

- Download project files
- Go to project root directory
- Run `npm i`

### Pre-defined npm scripts:

- `npm run build` -> build project to the _dist_ folder. Es-lint will be running before build.
- `npm run dev` -> run webpack dev server and open browser
- `npm run lint` -> run es-lint

