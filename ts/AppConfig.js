define(["require", "exports", "./game"], function (require, exports, game_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    require(['Game'], function (main) {
        var game = new game_1.Game(document.getElementById('screen'));
        game.start();
    });
});
//# sourceMappingURL=AppConfig.js.map