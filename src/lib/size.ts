/**
 * Represents a 2-dimensional (width,height) size.
 */
export class Size {
    constructor(public readonly width: number, public readonly height: number) {
        if (width < 0 || height < 0) {
            throw new Error('Dimensions cannot be negative.');
        }
    }
}