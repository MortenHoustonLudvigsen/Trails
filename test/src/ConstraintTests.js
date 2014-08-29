define(["require", "exports", "../../src/Constraints"], function(require, exports, Constraints) {
    describe("AlphaConstraint", function () {
        var constraint = new Constraints.AlphaConstraint();

        it("should match 'abCDef'", function () {
            expect(constraint.match("abCDef")).toBe("abCDef");
        });
    });
});
//# sourceMappingURL=ConstraintTests.js.map
