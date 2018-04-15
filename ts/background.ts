import {Drawable} from "./drawable";
import {Size} from "./size";
import {Screen} from "./screen";

export class Background extends Drawable
{
    size: Size;
    screenSize: Screen;

    constructor(src: string)
    {
        super(src);
        this.screenSize = new Screen();
        this.size = new Size(
            this.screenSize.width,
            this.screenSize.height
        );
    }

    draw(ctx: CanvasRenderingContext2D): void
    {
        this.position.normalize(this.screenSize);

        super.draw(ctx);

        this.position.x -= this.screenSize.width;
        super.draw(ctx);
        this.position.x += this.screenSize.width * 2;
        super.draw(ctx);
    }
}