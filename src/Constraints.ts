module Constraints {
    "use strict";

    var _constraints: { [name: string]: (...params: string[]) => IConstraint } = {};

    export interface IConstraint {
        match: (text: string) => any;
    }

    export function register(name: string, createConstraint: (...params: string[]) => IConstraint): void {
        _constraints[name] = createConstraint;
    }

    export function create(name: string, ...params: string[]): IConstraint {
        return _constraints[name].apply(null, params);
    }

    export class RegExpConstraint implements IConstraint {
        private _re: RegExp;
        constructor(regExp: string, flags?: string) {
            this._re = new RegExp("^" + regExp, flags);
        }

        public match(text: string): any {
            var match = this._re.exec(text);
            if (match) {
                return match[0];
            }
        }
    }

    export class StringConstraint extends RegExpConstraint {
        constructor() {
            super("[^/]+");
        }
    }

    export class AlphaConstraint extends RegExpConstraint {
        constructor() {
            super("\\w+");
        }
    }

    export class BoolConstraint extends RegExpConstraint {
        constructor() {
            super("true|false", "i");
        }
    }

    export class IntConstraint extends RegExpConstraint {
        constructor() {
            super("[+-]\\d+");
        }

        public match(text: string): any {
            var match = super.match(text);
            if (match !== undefined) {
                return parseInt(match[0], 10);
            }
        }
    }

    export class MinConstraint extends IntConstraint {
        public min: number;

        constructor(min: string) {
            super();
            this.min = parseInt(min, 10);
        }

        public match(text: string): any {
            var match = super.match(text);
            if (match !== undefined && match >= this.min) {
                return match;
            }
        }
    }

    export class MaxConstraint extends IntConstraint {
        public max: number;

        constructor(max: string) {
            super();
            this.max = parseInt(max, 10);
        }

        public match(text: string): any {
            var match = super.match(text);
            if (match !== undefined && match <= this.max) {
                return match;
            }
        }
    }

    export class RangeConstraint extends IntConstraint {
        public min: number;
        public max: number;

        constructor(min: string, max: string) {
            super();
            this.min = parseInt(min, 10);
            this.max = parseInt(max, 10);
        }

        public match(text: string): any {
            var match = super.match(text);
            if (match !== undefined && match >= this.min && match <= this.max) {
                return match;
            }
        }
    }

    export class MinLengthConstraint extends StringConstraint {
        public minLength: number;

        constructor(minLength: string) {
            super();
            this.minLength = parseInt(minLength, 10);
        }

        public match(text: string): any {
            var match = super.match(text);
            if (match !== undefined && match.length >= this.minLength) {
                return match;
            }
        }
    }

    export class MaxLengthConstraint extends StringConstraint {
        public maxLength: number;

        constructor(maxLength: string) {
            super();
            this.maxLength = parseInt(maxLength, 10);
        }

        public match(text: string): any {
            var match = super.match(text);
            if (match !== undefined && match.length <= this.maxLength) {
                return match;
            }
        }
    }

    export class LengthConstraint extends StringConstraint {
        public minLength: number;
        public maxLength: number;

        constructor(minLength: string, maxLength: string) {
            super();
            this.minLength = parseInt(minLength, 10);
            this.maxLength = parseInt(maxLength, 10);
        }

        public match(text: string): any {
            var match = super.match(text);
            if (match !== undefined && match.length >= this.minLength && match.length <= this.maxLength) {
                return match;
            }
        }
    }

    register("alpha", params => new AlphaConstraint());
    register("bool", params => new BoolConstraint());
    register("int", params => new IntConstraint());
    register("min", params => new MinConstraint(params[0]));
    register("max", params => new MaxConstraint(params[0]));
    register("range", params => new RangeConstraint(params[0], params[1]));
    register("minLength", params => new MinLengthConstraint(params[0]));
    register("maxLength", params => new MaxLengthConstraint(params[0]));
    register("length", params => new LengthConstraint(params[0], params[1]));
}

export = Constraints;
