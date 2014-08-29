var testFileRe = new RegExp("/base/test/src/.*\\.js$");

var tests = [];

for (var file in __karma__.files) {
    if (__karma__.files.hasOwnProperty(file)) {
        if (testFileRe.test(file)) {
            console.log("Test file: " + file);
            tests.push(file);
        }
    }
}

requirejs.config({
    baseUrl: "/base/test",
    deps: tests,
    callback: __karma__.start
});
//# sourceMappingURL=SpecRunner.karma.js.map
