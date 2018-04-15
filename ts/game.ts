import {Background} from "./background";

export class Game
{
    FPS: number = 60;
    SCREEN_WIDTH: number = 800;
    SCREEN_HEIGHT: number = 600;
    MAX_Y: number = 500;

    screen: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    // game loop
    interval: number;

    background: Background[];

    constructor(screen)
    {
        const FPS: number = 60;
        this.screen = screen;
        screen.width = 800;
        screen.height = 600;

        this.background = [];

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
                this.SCREEN_WIDTH,
                this.SCREEN_HEIGHT
            );

            this.background.forEach((el) => {
                el.draw(this.ctx);
            });


        }, 1000 / this.FPS);
    }

    loadBackground()
    {
        this.background.push(
            new Background('sprites/bg_sky.png')
        );

        this.background.push(
            new Background('sprites/bg_forest_1.png')
        );

        this.background.push(
            new Background('sprites/bg_forest_2.png')
        );

        this.background.push(
            new Background('sprites/bg_ground.png')
        );
    }
}

