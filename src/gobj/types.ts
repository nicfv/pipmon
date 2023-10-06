import { Size } from '../lib/size';

/**
 * Contains the cardinal directions in the game.
 */
export type Direction = 'down' | 'left' | 'up' | 'right';

/**
 * Represents the standard size of one map tile
 */
export const TILE_SIZE = new Size(16, 16);