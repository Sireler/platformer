import {Background} from "./Background";
import {Screen} from "./Screen";
import {Character} from "./Character";
import {KeyboardDriver} from "./KeyboardDriver";
import {Camera} from "./Camera";
import {PhysicParams} from "./PhysicParams";
import {Ball} from "./Ball";
import {Block} from "./Block";
import {ObjectPosition} from "./Position";
import {BlocksData} from "./PositionsData/BlocksData";
import {EnemyRanger} from "./EnemyRanger";
import {Enemy} from "./Enemy";
import {EnemiesData} from "./PositionsData/EnemiesData";
import {Trigger} from "./Triggers/Trigger";
import {Teleport} from "./Triggers/Teleport";
import {TeleportsData} from "./PositionsData/TeleportsData";
import {JumpersData} from "./PositionsData/JumpersData";
import {Jumper} from "./Triggers/Jumper";

export class Game {
    FPS: number = 30;
    // Ground position
    MAX_Y: number = 500;

    balls: Ball[];
    // Block objects
    blocks: Block[];
    // Enemy objects
    enemies: Enemy[];
    // Trigger objects
    triggers: Trigger[];
    // Physics parameters
    PHYS: PhysicParams;

    screen: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    // Size of the canvas for rendering
    screenSize: Screen;

    character: Character;

    keyboard: KeyboardDriver;
    camera: Camera;

    // Game loop
    interval: number;
    background;

    enemyCount = 0;

    constructor(screen) {
        this.screenSize = new Screen();
        this.keyboard = new KeyboardDriver();
        this.camera = new Camera();
        this.PHYS = new PhysicParams();

        this.balls = [];
        this.blocks = [];
        this.enemies = [];
        this.triggers = [];

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
        this.loadTriggers();
        this.start();
    }

    // Start game, updates, draw objects
    start(): void
    {
        this.interval = window.setInterval(() => {
            this.clearCanvas();

            this.drawBackground();
            this.moveCharacter();
            this.ballsColision();
            this.enemiesCollision();
            this.triggersCollision();
            this.drawObjects();
            this.moveCamera();
            this.checkForWin();
        }, 1000 / this.FPS);
    }

    // End game
    end(): void
    {
        clearInterval(this.interval);
        window.location.reload();
    }

    checkForWin()
    {
        if (this.enemyCount == 0) {
            this.win();
        }
    }

    // If this.enemyCount == 0
    win()
    {
        this.ctx.fillRect(
            0,
            0,
            this.screenSize.width,
            this.screenSize.height
        );

        this.ctx.textBaseline = "middle";
        this.ctx.strokeStyle = "#F00";
        this.ctx.font = "italic 52pt Arial";
        this.ctx.textAlign = "center";
        this.ctx.strokeText('You won!', 300, 200);

        setTimeout(() => {
            window.location.reload();
        }, 3000);

    }

    // Camera to track character
    moveCamera(): void
    {
        this.camera.position.x = this.character.position.x - this.screenSize.width / 2 + this.character.size.width / 2;
        if (this.character.position.y < this.screenSize.height / 2) {
            this.camera.position.y = this.character.position.y - this.screenSize.height / 2 + this.character.size.height / 2;
        }
    }

    // Interact with character, update
    moveCharacter(): void
    {
        this.character.isMovedByUser(this.keyboard, this.balls);
        this.character.update(this.PHYS, this.MAX_Y, this.blocks);
    }

    ballsColision(): void
    {
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
                    this.enemyCount--;
                }
            });
        });
    }

    triggersCollision(): void
    {
        this.triggers.forEach((t) => {
            t.checkHit(this.character);
            this.enemies.forEach((e) => {
                t.checkHit(e);
            });
            this.balls.forEach((b) => {
                t.checkHit(b);
            });
        });
    }

    enemiesCollision(): void
    {
        this.enemies.forEach((enemy, k) => {
            if (this.character.checkHit(enemy)) {
                delete this.enemies[k];
                this.end();
            }
            enemy.update(this.PHYS, this.MAX_Y, this.blocks);
        });
    }

    clearCanvas(): void
    {
        this.ctx.clearRect(
            0,
            0,
            this.screenSize.width,
            this.screenSize.height
        );
    }

    // Отрисовка объектов игры
    drawObjects(): void
    {
        this.blocks.forEach((block) => {
            block.draw(this.ctx, this.camera);
        });

        this.balls.forEach((ball) => {
            ball.draw(this.ctx, this.camera);
        });

        this.enemies.forEach((enemy) => {
            enemy.draw(this.ctx, this.camera);
        });

        this.triggers.forEach((trigger) => {
            trigger.draw(this.ctx, this.camera);
        });

        this.character.draw(this.ctx, this.camera);
    }

    drawBackground(): void
    {
        for (var key in this.background) {
            this.background[key].draw(this.ctx, this.camera);
        }
    }

    createBlock(position: ObjectPosition): void
    {
        this.blocks.push(
            new Block(position)
        );
    }

    createEnemyRanger(position: ObjectPosition): void
    {
        this.enemies.push(
            new EnemyRanger(position, this.blocks, this.balls)
        );
    }

    createTrigger(type: string, position: ObjectPosition, arg: ObjectPosition): void
    {
        let obj;

        switch (type) {
            case 'Teleport':
                obj = new Teleport(position, arg);
                break;
            case 'Jumper':
                obj = new Jumper(position, arg);
                break;
        }

        this.triggers.push(
            obj
        );
    }

    // Load triggers into Game.triggers
    loadTriggers(): void
    {
        let teleports = new TeleportsData();
        teleports.data.forEach((teleport) => {
            this.createTrigger(
                'Teleport',
                new ObjectPosition(teleport.x, teleport.y),
                new ObjectPosition(teleport.toX, teleport.toY)
            );
        });

        let jumpers = new JumpersData();
        jumpers.data.forEach((jumper) => {
            this.createTrigger(
                'Jumper',
                new ObjectPosition(jumper.x, jumper.y),
                new ObjectPosition(jumper.impulseX, jumper.impulseY)
            );
        });
    }

    // Load enemies into Game.enemies
    loadEnemies(): void
    {
        let enemies = new EnemiesData();
        enemies.data.forEach((enemy) => {
            this.createEnemyRanger(new ObjectPosition(enemy.x, enemy.y));
            this.enemyCount++;
        });
    }

    // Load blocks into Game.blocks
    loadBlocks(): void
    {
        let blocks = new BlocksData();
        blocks.data.forEach((block) => {
            this.createBlock(new ObjectPosition(block.x, block.y));
        });
    }

    // Load background into Game.background
    loadBackground(): void
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