import { Size } from '../lib/size';
import { Vec2 } from '../lib/vec';
import { AnimatedSprite, Animation } from './sprite';
import { Flip, Tileset } from './tileset';
import { Direction, TILE_SIZE } from './types';

/**
 * Represents the main player character in the game.
 */
export class Player extends AnimatedSprite<Direction> {
    // TODO: https://www.spriters-resource.com/game_boy_advance/pokemonemerald/
    private static readonly TS = new Tileset('https://www.spriters-resource.com/resources/sheets/8/8324.png', new Size(15, 22));
    private static readonly WALK_TURN_DELAY = 5;
    private facing: Direction;
    private delayRemaining: number;
    private walking: boolean;
    /**
     * Initialize a player character.
     */
    constructor(tilePosition: Vec2) {
        super({
            'down': new Animation([
                Player.TS.getTile(new Vec2(0, 0), new Vec2(0, -6)),
                Player.TS.getTile(new Vec2(0, 1), new Vec2(0, -5)),
                Player.TS.getTile(new Vec2(0, 0), new Vec2(0, -6)),
                Player.TS.getTile(new Vec2(0, 2), new Vec2(0, -5)),
            ], 10, true),
            'left': new Animation([
                Player.TS.getTile(new Vec2(2, 0), new Vec2(0, -6)),
                Player.TS.getTile(new Vec2(2, 1), new Vec2(-1, -5)),
                Player.TS.getTile(new Vec2(2, 0), new Vec2(0, -6)),
                Player.TS.getTile(new Vec2(2, 2), new Vec2(0, -5)),
            ], 10, true),
            'right': new Animation([
                Player.TS.getTile(new Vec2(2, 0), new Vec2(0, -6), new Flip(true, false)),
                Player.TS.getTile(new Vec2(2, 1), new Vec2(-1, -5), new Flip(true, false)),
                Player.TS.getTile(new Vec2(2, 0), new Vec2(0, -6), new Flip(true, false)),
                Player.TS.getTile(new Vec2(2, 2), new Vec2(0, -5), new Flip(true, false)),
            ], 10, true),
            'up': new Animation([
                Player.TS.getTile(new Vec2(1, 0), new Vec2(0, -6)),
                Player.TS.getTile(new Vec2(1, 1), new Vec2(0, -5)),
                Player.TS.getTile(new Vec2(1, 0), new Vec2(0, -6)),
                Player.TS.getTile(new Vec2(1, 2), new Vec2(0, -5)),
            ], 10, true),
        }, new Vec2(tilePosition.x * TILE_SIZE.width, tilePosition.y * TILE_SIZE.height));
        this.facing = 'down';
        this.delayRemaining = 0;
        this.walking = false;
        super.setAnimation(this.facing);
    }
    /**
     * Make the player walk in a specified direction.
     */
    public walk(direction: Direction | 'none'): void {
        if (this.walking && (this.position.x % TILE_SIZE.width || this.position.y % TILE_SIZE.height)) {
            direction = this.facing;
        }
        if (direction === 'none') {
            super.stop();
            this.walking = false;
            return;
        }
        if (direction !== this.facing) {
            this.facing = direction;
            this.delayRemaining = Player.WALK_TURN_DELAY;
            this.setAnimation(this.facing);
            super.stop();
            this.walking = false;
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
        this.walking = true;
    }
}