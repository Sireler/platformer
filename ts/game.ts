import {Background} from "./background";
import {Screen} from "./screen";

export class Game
{
    FPS: number = 25;
    MAX_Y: number = 500;

    screen: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    screenSize: Screen;

    // game loop
    interval: number;

    background;

    constructor(screen)
    {
        this.screenSize = new Screen();

        this.screen = screen;
        screen.width = this.screenSize.width;
        screen.height = this.screenSize.height;

        this.background = {};

        this.ctx = screen.getContext("2d");
        this.loadBackground();
        this.start();
    }

    start()
    {
        this.interval = window.setInterval(() => {

            this.ctx.clearRect(
                0,
                0,
                this.screenSize.width,
                this.screenSize.height
            );

            // Draw background
            for (var key in this.background) {
                this.background[key].draw(this.ctx);
            }

            this.background.sky.position.x += 2;
            // ---


        }, 1000 / this.FPS);
    }

    //
    loadBackground()
    {
        this.background.sky = new Background('sprites/bg_sky.png');
        this.background.forest1 = new Background('sprites/bg_forest_1.png');
        this.background.forest2 = new Background('sprites/bg_forest_2.png');
        this.background.ground = new Background('sprites/bg_ground.png');
    }
}

