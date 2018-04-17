import {Background} from "./background";
import {Screen} from "./screen";
import {Character} from "./character";
import {KeyboardDriver} from "./KeyboardDriver";
import {Camera} from "./Camera";
import {PhysicParams} from "./PhysicParams";
import {Ball} from "./Ball";
import {Block} from "./Block";
import {ObjectPosition} from "./position";
import {BlocksData} from "./BlocksData";
import {EnemyRanger} from "./EnemyRanger";
import {Enemy} from "./Enemy";
import {EnemiesData} from "./EnemiesData";

export class Game {
    FPS: number = 25;
    MAX_Y: number = 500;

    balls: Ball[];
    blocks: Block[];
    enemies: Enemy[];

    PHYS: PhysicParams;

    screen: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    screenSize: Screen;


    character: Character;

    keyboard: KeyboardDriver;
    camera: Camera;

    // game loop
    interval: number;

    background;

    constructor(screen) {
        this.screenSize = new Screen();
        this.keyboard = new KeyboardDriver();
        this.camera = new Camera();
        this.PHYS = new PhysicParams();

        this.balls = [];
        this.blocks = [];
        this.enemies = [];

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
        this.loadBlocks();
        this.loadEnemies();
        this.start();
    }

    start() {
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
            this.character.update(this.PHYS['gravity'], this.MAX_Y, this.blocks);

            this.balls.forEach((b, i) => {
                b.update(this.PHYS, this.MAX_Y, this.blocks);
                if (b.timeToLife <= 0) {
                    delete this.balls[i];
                }
                if (b.checkHit(this.character)) {
                    this.end();
                }
                this.enemies.forEach((e, j) => {
                    if (b.checkHit(e)) {
                        delete this.enemies[j];
                        delete this.balls[i];
                    }
                });
            });

            this.enemies.forEach((enemy, k) => {
                if (this.character.checkHit(enemy)) {
                    delete this.enemies[k];
                    this.end();
                }
                enemy.update(this.PHYS.gravity, this.MAX_Y, this.blocks);
            });

            this.blocks.forEach((block) => {
                block.draw(this.ctx, this.camera);
            });

            this.balls.forEach((ball) => {
                ball.draw(this.ctx, this.camera);
            });

            this.enemies.forEach((enemy) => {
                enemy.draw(this.ctx, this.camera);
            });

            this.character.draw(this.ctx, this.camera);

            this.camera.position.x = this.character.position.x - this.screenSize.width / 2 + this.character.size.width / 2;
            if (this.character.position.y < this.screenSize.height / 2) {
                this.camera.position.y = this.character.position.y - this.screenSize.height / 2 + this.character.size.height / 2;
            }

        }, 1000 / this.FPS);
    }

    end()
    {
        clearInterval(this.interval);
        window.location.reload();
    }

    createBlock(position: ObjectPosition) {
        this.blocks.push(
            new Block(position)
        );
    }

    createEnemyRanger(position: ObjectPosition) {
        this.enemies.push(
            new EnemyRanger(position, this.blocks, this.balls)
        );
    }

    loadEnemies()
    {
        let enemies = new EnemiesData();
        enemies.data.forEach((enemy) => {
            this.createEnemyRanger(new ObjectPosition(enemy.x, enemy.y));
        });
    }

    loadBlocks()
    {
        let blocks = new BlocksData();
        blocks.data.forEach((block) => {
            this.createBlock(new ObjectPosition(block.x, block.y));
        });
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

