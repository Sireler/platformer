import {Game} from "./Game";

require(
    ['Game'],
    (main: any) => {
        var game = new Game( document.getElementById('screen') );
        game.start();

    }
);
