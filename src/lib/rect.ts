/**
 * Represents a fixed rectangle.
 */
export class Rectangle {
    /**
     * The top side of the rectangle
     */
    public readonly top: number;
    /**
     * The bottom side of the rectangle
     */
    public readonly bottom: number;
    /**
     * The left side of the rectangle
     */
    public readonly left: number;
    /**
     * The right side of the rectangle
     */
    public readonly right: number;
    /**
     * Create a new rectangle given x, y, width, and height.
     * @param x The x-position of the top-left corner
     * @param y The y-position of the top-left corner
     * @param width The width of the rectangle
     * @param height The height of the rectangle
     */
    constructor(public readonly x: number, public readonly y: number, public readonly width: number, public readonly height: number) {
        this.top = y;
        this.bottom = y + height;
        this.left = x;
        this.right = x + width;
    }
    /**
     * Determine if 2 rectangles intersect.
     */
    public static intersect(a: Rectangle, b: Rectangle): boolean {
        return a.top < b.bottom && a.bottom > b.top && a.left < b.right && a.right > b.left;
    }
    /**
     * Determine if this rectangle intersects with another.
     */
    public intersect(other: Rectangle): boolean {
        return Rectangle.intersect(this, other);
    }
}