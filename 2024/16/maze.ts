interface Pos {
    x: number;
    y: number;
}

type Facing =  'E'|'W'|'N'|'S';

class Node {
    public facing: Facing
    public pos: Pos;
    public score: number;

    constructor({f, p, s}: {f: Facing, p: Pos, s: number}) {
        this.facing = f;
        this.pos = p;
        this.score = s;
    }

    get posStr() {
        return `${this.pos.x},${this.pos.y}`;
    }

    get visitCode() {
        return `${this.posStr},${this.facing}`;
    }
}

export class Maze {
    private readonly _height: number;
    private readonly _width: number;
    private _map: Set<string> = new Set();
    private readonly _startNode: Node;
    private readonly _finishPos: string;
    private _visited: Map<string, Node> = new Map();

    constructor(lines: string[]) {
        this._height = lines.length;
        this._width = lines[0].length;
        let startNode: Node;
        let finish = '';
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                const posStr = `${x},${y}`;
                const val = lines[y][x];
                switch (val) {
                    case 'S':
                        startNode = new Node({
                            f: 'E',
                            p: {
                                x: x,
                                y: y,
                            },
                            s: 0,
                        });
                        break;
                    case 'E':
                        finish = posStr;
                        break;
                    case '#':
                        this._map.add(posStr)
                        break;
                    default:
                        break;
                }
            }
        }
        this._startNode = startNode!;
        this._finishPos = finish;
    }

    private findNeighbors(node: Node): Node[] {
        let moveForward: Node;
        let cw: Node;
        let ccw: Node;

        switch (node.facing) {
            case 'N':
                moveForward = new Node({
                    f: node.facing,
                    p: {
                        x: node.pos.x,
                        y: node.pos.y - 1,
                    },
                    s: node.score + 1,
                });
                cw = new Node({
                    f: 'E',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
                ccw = new Node({
                    f: 'W',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
                break;
            case 'E':
                moveForward = new Node({
                    f: node.facing,
                    p: {
                        x: node.pos.x + 1,
                        y: node.pos.y,
                    },
                    s: node.score + 1,
                });
                cw = new Node({
                    f: 'S',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
                ccw = new Node({
                    f: 'N',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
                break;
            case 'S':
                moveForward = new Node({
                    f: node.facing,
                    p: {
                        x: node.pos.x,
                        y: node.pos.y + 1,
                    },
                    s: node.score + 1,
                });
                cw = new Node({
                    f: 'W',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
                ccw = new Node({
                    f: 'E',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
                break;
            case 'W':
                moveForward = new Node({
                    f: node.facing,
                    p: {
                        x: node.pos.x - 1,
                        y: node.pos.y,
                    },
                    s: node.score + 1,
                });
                cw = new Node({
                    f: 'N',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
                ccw = new Node({
                    f: 'S',
                    p: {
                        x: node.pos.x,
                        y: node.pos.y,
                    },
                    s: node.score + 1000,
                });
       }

       return [moveForward, cw, ccw].filter((n) => {
            let isVisited: boolean = this._visited.has(n.visitCode);
            if (isVisited) {
                isVisited = n.score >= this._visited.get(n.visitCode)!.score;
            }

            return (
                !isVisited &&
                !this._map.has(n.posStr) &&
                n.pos.x > 0 &&
                n.pos.x < this._width &&
                n.pos.y > 0 &&
                n.pos.y < this._height
            );
        });    
    }

    private solve() {
        const q: Node[] = [this._startNode];
        let score = Number.MAX_SAFE_INTEGER;

        while (q.length > 0) {
            const node = q.shift()!;
            if (node.posStr === this._finishPos) {
                if (node.score < score) {
                    score = node.score;
                }
                continue;
            }            
            this._visited.set(node.visitCode, node);
            const neighbors = this.findNeighbors(node);
            for (let n of neighbors) {
                q.push(n);
            }
        }
        return score;
    }

    public getScore(): number {
        return this.solve();
    }
}
