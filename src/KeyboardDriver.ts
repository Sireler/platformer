export class KeyboardDriver
{
    keys: object;

    constructor()
    {
        this.keys = {};

        document.addEventListener(
            'keydown',
            (e) => {
                this.keys[e.keyCode] = true;
            }
        );

        document.addEventListener(
            'keyup',
            (e) => {
                this.keys[e.keyCode] = false;
            }
        );
    }

    isPressed(key)
    {
        return this.keys[key];
    }
}