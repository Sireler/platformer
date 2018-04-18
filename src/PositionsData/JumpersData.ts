export class JumpersData
{
    data;

    constructor()
    {
        // (x,y) - position to draw
        // (impulseX, impulseY) - impulse to drop
        this.data = [
            {
                x: 600,
                y: 470,
                impulseX: 0,
                impulseY: -20
            },
            {
                x: 1070,
                y: -65,
                impulseX: -25,
                impulseY: -25
            }
        ]
    }
}