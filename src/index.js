
import someOtherFunction from './some/namespace/es6export'

function testFunction() {
    console.log('hi')
    // let's call func
    // some.namespace.func();
    console.log(someOtherFunction());
}

function ignoredFunction() {
    console.log('this code will not appear in output')
}


testFunction();

// export the test function so it will be included
window['theFuncFunction'] = testFunction;