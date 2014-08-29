module main {
    "use strict";

    // Reference your test modules here
    var testModules = [
        "ConstraintTests",
        "TestFile1"
    ];

    // After the "jasmine-boot" module creates the Jasmine environment, load all test modules then run them
    require(["jasmine-boot"], function () {
        require(testModules.map(m => "src/" + m), window.onload);
    });
}
