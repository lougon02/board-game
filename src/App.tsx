import { Client } from 'boardgame.io/react';
import { MyGame } from '@game/game.ts';


const App = Client({ 
  game: MyGame, 
  debug: true,
});

export default App
