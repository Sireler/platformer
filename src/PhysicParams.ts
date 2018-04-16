export class PhysicParams
{
    gravity: number;
    windage: number;

    constructor()
    {
        this.gravity = 0.4;
        this.windage = 1 - 0.04;
    }
}