import Constraints = require("../../src/Constraints");

describe("AlphaConstraint", function () {
    var constraint = new Constraints.AlphaConstraint();

    it("should match 'abCDef'", function () {
        expect(constraint.match("abCDef")).toBe("abCDef");
    });
});
