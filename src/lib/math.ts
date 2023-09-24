/**
 * Provides a range of mathematical helper functions.
 */
export class JMath {
    /**
     * Clamp `num` in between `min` and `max`, inclusive.
     */
    public static clamp(num: number, min: number, max: number): number {
        if (num < min) {
            return min;
        } else if (num > max) {
            return max;
        } else {
            return num;
        }
    }
}