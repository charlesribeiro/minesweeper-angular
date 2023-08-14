# Minesweeper

This is a browser implementation of the classic game Minesweeper using Angular 16.

![Minesweeper](screenshots/Screenshot.png)


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

<pre>-----------------------------------------------------|---------|----------|---------|---------|--------------------
File                                                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
-----------------------------------------------------|---------|----------|---------|---------|--------------------
<font color="#8AE234"><b>All files                                           </b></font> | <font color="#8AE234"><b>  94.01</b></font> | <font color="#8AE234"><b>      86</b></font> | <font color="#8AE234"><b>  90.69</b></font> | <font color="#8AE234"><b>  93.81</b></font> | <font color="#EF2929"><b>                  </b></font> 
<font color="#8AE234"><b> app                                                </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  app.component.html                                </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  app.component.ts                                  </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/game/components/main-game             </b></font> | <font color="#8AE234"><b>  93.93</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>  83.33</b></font> | <font color="#8AE234"><b>  93.93</b></font> | <font color="#EF2929"><b>                  </b></font> 
<font color="#8AE234"><b>  main-game.component.html                          </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  main-game.component.ts                            </b></font> | <font color="#8AE234"><b>  93.75</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>  83.33</b></font> | <font color="#8AE234"><b>  93.75</b></font> | <font color="#EF2929"><b>59,71             </b></font> 
<font color="#8AE234"><b> app/features/game/containers/board                 </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  board.component.html                              </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  board.component.ts                                </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/game/containers/cell                  </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  cell.component.html                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  cell.component.ts                                 </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/game/containers/reset-button          </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  reset-button.component.html                       </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  reset-button.component.ts                         </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/game/containers/seven-segment         </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  seven-segment-display.component.html              </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  seven-segment-display.component.ts                </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#EF2929"><b> app/features/save-and-load/components/save-and-load</b></font> | <font color="#EF2929"><b>  48.14</b></font> | <font color="#EF2929"><b>       0</b></font> | <font color="#FCE94F"><b>  57.14</b></font> | <font color="#EF2929"><b>  48.14</b></font> | <font color="#EF2929"><b>                  </b></font> 
<font color="#8AE234"><b>  save-and-load.component.html                      </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#EF2929"><b>  save-and-load.component.ts                        </b></font> | <font color="#EF2929"><b>  46.15</b></font> | <font color="#EF2929"><b>       0</b></font> | <font color="#FCE94F"><b>  57.14</b></font> | <font color="#EF2929"><b>  46.15</b></font> | <font color="#EF2929"><b>30-58             </b></font> 
<font color="#8AE234"><b> app/features/settings/components                   </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  settings.component.html                           </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  settings.component.ts                             </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/settings/store                        </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  settings.actions.ts                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  settings.reducer.ts                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  settings.selectors.ts                             </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/shared/containers/error               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  error.component.html                              </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  error.component.ts                                </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/shared/containers/header              </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  header.component.html                             </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  header.component.ts                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/shared/containers/loader              </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  loader.component.html                             </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  loader.component.ts                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/features/shared/containers/page-wrapper        </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  page-wrapper.component.html                       </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  page-wrapper.component.ts                         </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/models                                         </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  cell.model.ts                                     </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  gameStatus.model.ts                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  level.model.ts                                    </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  sessionTypes.ts                                   </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/services                                       </b></font> | <font color="#8AE234"><b>  89.38</b></font> | <font color="#8AE234"><b>   84.21</b></font> | <font color="#FCE94F"><b>  78.78</b></font> | <font color="#8AE234"><b>  88.99</b></font> | <font color="#EF2929"><b>                  </b></font> 
<font color="#8AE234"><b>  click-handler.service.ts                          </b></font> | <font color="#8AE234"><b>  84.31</b></font> | <font color="#8AE234"><b>   92.85</b></font> | <font color="#FCE94F"><b>  72.72</b></font> | <font color="#8AE234"><b>  84.31</b></font> | <font color="#EF2929"><b>32,37,42,59-64,123</b></font> 
<font color="#8AE234"><b>  create-level.service.ts                           </b></font> | <font color="#8AE234"><b>  89.18</b></font> | <font color="#EF2929"><b>       0</b></font> | <font color="#FCE94F"><b>     60</b></font> | <font color="#8AE234"><b>  88.23</b></font> | <font color="#EF2929"><b>24,28,32,36       </b></font> 
<font color="#8AE234"><b>  storage.service.ts                                </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  timer.service.ts                                  </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>      75</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>45                </b></font> 
<font color="#8AE234"><b> app/state                                          </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  app.actions.ts                                    </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  app.effects.ts                                    </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  app.reducer.ts                                    </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  app.selectors.ts                                  </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b> app/utils                                          </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  fisher-yates-shuffle.ts                           </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  mock-board.ts                                     </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  mock-cell.ts                                      </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  mock-settings.ts                                  </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  neighbor-offsets.ts                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  predefinedLevels.ts                               </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
<font color="#8AE234"><b>  store-utils.ts                                    </b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>     100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#8AE234"><b>    100</b></font> | <font color="#FCE94F"><b>                  </b></font> 
-----------------------------------------------------|---------|----------|---------|---------|--------------------
</pre>

## Credits

Thanks to eugeneloza that provided the assets here https://opengameart.org/content/minesweeper-tile-set. Also, to the developers behind each of the imported GitHub Actions. This project uses the DSEG7(https://github.com/keshikan/DSEG) font.
