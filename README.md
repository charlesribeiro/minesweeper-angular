# Minesweeper

This is a browser implementation of the classic game Minesweeper using Angular 16.


## TL;DR

Make sure you have NPM and Yarn installed on your machine, install dependencies with `yarn`. Then, just run `yarn start` to open the project. `yarn test` and `yarn test-coverage` will run the Jest unit tests.

## Technologies used

* Angular 16
* TailwindCSS with SASS
* Redux (NgRx + RxJs)
* Jest (jest-preset-angular)
* Github Actions

## Cool Features

* This project uses SASS for styling (plus TailwindCSS)
* The application can be tested using `yarn test`
* The project auto-lints the files, also, `yarn lint:fix` will try to fix linting problems with Prettier
* A coverage report is available with jest `yarn test-coverage`
* This projects includes load and save features. You can navigate to 'save-and-load' and upload the `saves/savewith35mines.json` file.

## Algorithms employed

This project uses two notable algorithms:

###  Deep Search First

One of the most challenging parts of the game is to implement the following behavior:
>If the clicked cell number of adjacent mines is 0, it behaves as if the user had
clicked on every cell around it.

This is reached by the Deep Search First algorithm
(https://en.wikipedia.org/wiki/Depth-first_search)

### Fisher–Yates shuffle

Another really useful algorithm used in this project is the Fisher–Yates shuffle.
It ensures the creation of truly randomized grids, so each game you generate in this game is unique!
(https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)

## Code coverage

This project aims to have a high unit test coverage for statements.

## Credits

Thanks to eugeneloza that provided the assets here https://opengameart.org/content/minesweeper-tile-set. Also, to the developers behind each of the imported GitHub Actions. This project uses the DSEG7(https://github.com/keshikan/DSEG) font.
