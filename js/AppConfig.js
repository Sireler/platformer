define(["require", "exports", "./Game"], function (require, exports, Game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require(['Game'], function (main) {
        var game = new Game_1.Game(document.getElementById('screen'));
        game.start();
    });
});
//# sourceMappingURL=AppConfig.js.map