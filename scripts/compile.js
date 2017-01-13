const closureBuilder = require('closure-builder');
const glob = closureBuilder.globSupport();
const fs = require('fs');

let prepend = fs.readFileSync('injected_license.js', 'utf8');
prepend = prepend.replace('%DATE%', getDate());
prepend = prepend.replace('%VERSION%', getVar('version'));
prepend = prepend.replace('%HOMEPAGE%', getVar('homepage'));
prepend = prepend.replace('%LICENSE%', getVar('license'));
prepend = prepend.replace('%AUTHOR%', getVar('author'));
prepend += '\n(function() {';

closureBuilder.build({
    name: 'main',
    srcs: glob([
        'src/**/*.js',
        'soy/**/*.soy'
    ]),
    out_source_map: 'out/compiled.js.map',
    deps: [],
    prepend,
    append: '})()',
    out: 'out/compiled.js',
    options: {
        closure: {
            compilation_level: 'ADVANCED',
            assume_function_wrapper: true,
            entry_point: './src/index',
            dependency_mode: 'STRICT',
            output_manifest: 'out/manifest.MF',
            use_closure_library: true,
        }
    }
}, callback);


function callback(errors, warnings, files, results) {
    console.log(arguments);
    results.replace('%TIMESTAMP%', 'xxx')
}

function getDate() {
    let now = new Date();
    now = now.toDateString();
    return now;
}

function getVar(name) {
    let json = require('../package.json');
    let path = name.split('.');
    let cursor = json;
    for(let i = 0; i < path.length; i++) {
        cursor = (cursor || {})[path[i]];
    }
    return (cursor || '').toString();
}