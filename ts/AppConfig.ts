import {Game} from "./game";
import {Character} from "./character";

require(
    ['Game'],
    (main: any) => {
        var game = new Game( document.getElementById('screen') );
        game.start();

    }
);
