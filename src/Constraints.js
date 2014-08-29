var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports"], function(require, exports) {
    var Constraints;
    (function (Constraints) {
        "use strict";

        var _constraints = {};

        function register(name, createConstraint) {
            _constraints[name] = createConstraint;
        }
        Constraints.register = register;

        function create(name) {
            var params = [];
            for (var _i = 0; _i < (arguments.length - 1); _i++) {
                params[_i] = arguments[_i + 1];
            }
            return _constraints[name].apply(null, params);
        }
        Constraints.create = create;

        var RegExpConstraint = (function () {
            function RegExpConstraint(regExp, flags) {
                this._re = new RegExp("^" + regExp, flags);
            }
            RegExpConstraint.prototype.match = function (text) {
                var match = this._re.exec(text);
                if (match) {
                    return match[0];
                }
            };
            return RegExpConstraint;
        })();
        Constraints.RegExpConstraint = RegExpConstraint;

        var StringConstraint = (function (_super) {
            __extends(StringConstraint, _super);
            function StringConstraint() {
                _super.call(this, "[^/]+");
            }
            return StringConstraint;
        })(RegExpConstraint);
        Constraints.StringConstraint = StringConstraint;

        var AlphaConstraint = (function (_super) {
            __extends(AlphaConstraint, _super);
            function AlphaConstraint() {
                _super.call(this, "\\w+");
            }
            return AlphaConstraint;
        })(RegExpConstraint);
        Constraints.AlphaConstraint = AlphaConstraint;

        var BoolConstraint = (function (_super) {
            __extends(BoolConstraint, _super);
            function BoolConstraint() {
                _super.call(this, "true|false", "i");
            }
            return BoolConstraint;
        })(RegExpConstraint);
        Constraints.BoolConstraint = BoolConstraint;

        var IntConstraint = (function (_super) {
            __extends(IntConstraint, _super);
            function IntConstraint() {
                _super.call(this, "[+-]\\d+");
            }
            IntConstraint.prototype.match = function (text) {
                var match = _super.prototype.match.call(this, text);
                if (match !== undefined) {
                    return parseInt(match[0], 10);
                }
            };
            return IntConstraint;
        })(RegExpConstraint);
        Constraints.IntConstraint = IntConstraint;

        var MinConstraint = (function (_super) {
            __extends(MinConstraint, _super);
            function MinConstraint(min) {
                _super.call(this);
                this.min = parseInt(min, 10);
            }
            MinConstraint.prototype.match = function (text) {
                var match = _super.prototype.match.call(this, text);
                if (match !== undefined && match >= this.min) {
                    return match;
                }
            };
            return MinConstraint;
        })(IntConstraint);
        Constraints.MinConstraint = MinConstraint;

        var MaxConstraint = (function (_super) {
            __extends(MaxConstraint, _super);
            function MaxConstraint(max) {
                _super.call(this);
                this.max = parseInt(max, 10);
            }
            MaxConstraint.prototype.match = function (text) {
                var match = _super.prototype.match.call(this, text);
                if (match !== undefined && match <= this.max) {
                    return match;
                }
            };
            return MaxConstraint;
        })(IntConstraint);
        Constraints.MaxConstraint = MaxConstraint;

        var RangeConstraint = (function (_super) {
            __extends(RangeConstraint, _super);
            function RangeConstraint(min, max) {
                _super.call(this);
                this.min = parseInt(min, 10);
                this.max = parseInt(max, 10);
            }
            RangeConstraint.prototype.match = function (text) {
                var match = _super.prototype.match.call(this, text);
                if (match !== undefined && match >= this.min && match <= this.max) {
                    return match;
                }
            };
            return RangeConstraint;
        })(IntConstraint);
        Constraints.RangeConstraint = RangeConstraint;

        var MinLengthConstraint = (function (_super) {
            __extends(MinLengthConstraint, _super);
            function MinLengthConstraint(minLength) {
                _super.call(this);
                this.minLength = parseInt(minLength, 10);
            }
            MinLengthConstraint.prototype.match = function (text) {
                var match = _super.prototype.match.call(this, text);
                if (match !== undefined && match.length >= this.minLength) {
                    return match;
                }
            };
            return MinLengthConstraint;
        })(StringConstraint);
        Constraints.MinLengthConstraint = MinLengthConstraint;

        var MaxLengthConstraint = (function (_super) {
            __extends(MaxLengthConstraint, _super);
            function MaxLengthConstraint(maxLength) {
                _super.call(this);
                this.maxLength = parseInt(maxLength, 10);
            }
            MaxLengthConstraint.prototype.match = function (text) {
                var match = _super.prototype.match.call(this, text);
                if (match !== undefined && match.length <= this.maxLength) {
                    return match;
                }
            };
            return MaxLengthConstraint;
        })(StringConstraint);
        Constraints.MaxLengthConstraint = MaxLengthConstraint;

        var LengthConstraint = (function (_super) {
            __extends(LengthConstraint, _super);
            function LengthConstraint(minLength, maxLength) {
                _super.call(this);
                this.minLength = parseInt(minLength, 10);
                this.maxLength = parseInt(maxLength, 10);
            }
            LengthConstraint.prototype.match = function (text) {
                var match = _super.prototype.match.call(this, text);
                if (match !== undefined && match.length >= this.minLength && match.length <= this.maxLength) {
                    return match;
                }
            };
            return LengthConstraint;
        })(StringConstraint);
        Constraints.LengthConstraint = LengthConstraint;

        register("alpha", function (params) {
            return new AlphaConstraint();
        });
        register("bool", function (params) {
            return new BoolConstraint();
        });
        register("int", function (params) {
            return new IntConstraint();
        });
        register("min", function (params) {
            return new MinConstraint(params[0]);
        });
        register("max", function (params) {
            return new MaxConstraint(params[0]);
        });
        register("range", function (params) {
            return new RangeConstraint(params[0], params[1]);
        });
        register("minLength", function (params) {
            return new MinLengthConstraint(params[0]);
        });
        register("maxLength", function (params) {
            return new MaxLengthConstraint(params[0]);
        });
        register("length", function (params) {
            return new LengthConstraint(params[0], params[1]);
        });
    })(Constraints || (Constraints = {}));

    
    return Constraints;
});
//# sourceMappingURL=Constraints.js.map
