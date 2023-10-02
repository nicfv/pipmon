import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';
import { AnimatedSprite, Animation } from './sprite';
import { Tileset } from './tileset';
import { Direction } from './types';

export class Player extends AnimatedSprite<Direction> {
    private static readonly TS = new Tileset('img/player.png', new Size(32, 32));
    constructor(position: Vec2) {
        super({
            'down': new Animation([
                Player.TS.getTile(new Vec2(0, 0)),
                Player.TS.getTile(new Vec2(1, 0)),
                Player.TS.getTile(new Vec2(2, 0)),
                Player.TS.getTile(new Vec2(3, 0)),
            ], 10, true),
            'left': new Animation([
                Player.TS.getTile(new Vec2(0, 1)),
                Player.TS.getTile(new Vec2(1, 1)),
                Player.TS.getTile(new Vec2(2, 1)),
                Player.TS.getTile(new Vec2(3, 1)),
            ], 10, true),
            'right': new Animation([
                Player.TS.getTile(new Vec2(0, 2)),
                Player.TS.getTile(new Vec2(1, 2)),
                Player.TS.getTile(new Vec2(2, 2)),
                Player.TS.getTile(new Vec2(3, 2)),
            ], 10, true),
            'up': new Animation([
                Player.TS.getTile(new Vec2(0, 3)),
                Player.TS.getTile(new Vec2(1, 3)),
                Player.TS.getTile(new Vec2(2, 3)),
                Player.TS.getTile(new Vec2(3, 3)),
            ], 10, true),
        }, position, new Vec2(-8, -8));
    }
    public go(direction: Direction): void {
        const dirVec2 = new Vec2(0, 0);
        switch (direction) {
            case ('down'): {
                dirVec2.y = 1;
                break;
            }
            case ('left'): {
                dirVec2.x = -1;
                break;
            }
            case ('right'): {
                dirVec2.x = 1;
                break;
            }
            case ('up'): {
                dirVec2.y = -1;
                break;
            }
            default: {
                throw new Error('Invalid direction ' + direction);
            }
        }
        super.setAnimation(direction);
        super.move(dirVec2);
    }
    protected onAnimationComplete(): void {
        // TODO: Not necessary to inherit...
    }
}