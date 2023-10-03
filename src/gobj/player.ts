import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';
import { AnimatedSprite, Animation } from './sprite';
import { Tileset } from './tileset';
import { Direction } from './types';

/**
 * Represents the main player character in the game.
 */
export class Player extends AnimatedSprite<Direction> {
    private static readonly TS = new Tileset('img/player.png', new Size(32, 32));
    private static readonly WALK_TURN_DELAY = 5;
    private facing: Direction;
    private delayRemaining: number;
    /**
     * Initialize a player character.
     */
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
        this.facing = 'down';
        this.delayRemaining = 0;
        super.setAnimation(this.facing);
    }
    /**
     * Make the player walk in a specified direction.
     */
    public walk(direction: Direction | 'none'): void {
        if (direction === 'none') {
            super.stop();
            return;
        }
        if (direction !== this.facing) {
            this.facing = direction;
            this.delayRemaining = Player.WALK_TURN_DELAY;
            this.setAnimation(this.facing);
            super.stop();
            return;
        }
        if (this.delayRemaining > 0) {
            this.delayRemaining--;
            return;
        }
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
        super.start();
        super.move(dirVec2);
    }
}