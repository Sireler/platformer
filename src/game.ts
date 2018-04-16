import {Background} from "./background";
import {Screen} from "./screen";
import {Character} from "./character";
import {KeyboardDriver} from "./KeyboardDriver";
import {Camera} from "./Camera";

export class Game
{
    FPS: number = 25;
    MAX_Y: number = 500;

    balls;

    // Физика
    PHYS: object = {
        gravity: 0.4,
        windage: 1 - 0.04
    };
    //---

    screen: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    screenSize: Screen;

    character: Character;

    keyboard: KeyboardDriver;
    camera: Camera;

    // game loop
    interval: number;

    background;

    constructor(screen)
    {
        this.screenSize = new Screen();
        this.keyboard = new KeyboardDriver();
        this.camera = new Camera();

        this.balls = [];

        this.screen = screen;
        screen.width = this.screenSize.width;
        screen.height = this.screenSize.height;

        this.background = {};

        // Создание персонажа
        this.character = new Character({
            left: 'sprites/man_left.png',
            right: 'sprites/man_right.png'
        });

        this.character.position.set(400, 300);
        //---

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
                this.background[key].draw(this.ctx, this.camera);
            }

            //this.background.sky.position.x += 2;
            // ---

            this.character.isMovedByUser(this.keyboard, this.balls);
            this.character.update(this.PHYS['gravity'], this.MAX_Y);

            this.character.draw(this.ctx, this.camera);

            this.balls.forEach((b,i)=> {
                b.update(this.PHYS, this.MAX_Y);
                if(b.timeToLife<=0){
                    delete this.balls[i];
                }
                if(b.checkHit(this.character)){
                    alert('GameOver');
                    clearInterval(this.interval);
                    window.location.reload();
                }
            });

            this.balls.forEach((b) => {
                b.draw(this.ctx, this.camera);
            });


            this.camera.position.x = this.character.position.x - this.screenSize.width / 2 + this.character.size.width / 2;
            if (this.character.position.y < this.screenSize.height / 2) {
                this.camera.position.y = this.character.position.y - this.screenSize.height / 2 + this.character.size.height / 2;
            }

        }, 1000 / this.FPS);
    }

    //
    loadBackground()
    {
        this.background.sky = new Background('sprites/bg_sky.png');
        this.background.sky.cameraC = 0;
        this.background.forest1 = new Background('sprites/bg_forest_1.png');
        this.background.forest1.cameraC = 0.05;
        this.background.forest2 = new Background('sprites/bg_forest_2.png');
        this.background.forest2.cameraC = 0.1;
        this.background.ground = new Background('sprites/bg_ground.png');
    }
}

