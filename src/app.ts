import { Point } from './type';

function formatPoint(pt: Point): string {
    return '(' + pt.x.toString() + ',' + pt.y.toString() + ')';
}

console.log(formatPoint(new Point(14, 60)));