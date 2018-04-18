export class TeleportsData
{
    data;

    constructor()
    {
        // (x,y) - position to draw (place of teleport)
        // (toX, toY) - where will be teleported
        this.data = [
            {
                x: 200,
                y: 450,
                toX: 500,
                toY: 150
            },
            {
                x: 750,
                y: 0,
                toX: 1300,
                toY: -200
            }
        ]
    }
}