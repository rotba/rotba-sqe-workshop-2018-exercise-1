import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {extractData} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty function correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script","loc":{"start":{"line":0,"column":0},"end":{"line":0,"column":0}}}'
        );
    });

    it('is parsing a simple variable declaration correctly', () => {
        assert.equal(
            JSON.stringify(parseCode('let a = 1;')),
            '{"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"a","loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":5}}},"init":{"type":"Literal","value":1,"raw":"1","loc":{"start":{"line":1,"column":8},"end":{"line":1,"column":9}}},"loc":{"start":{"line":1,"column":4},"end":{"line":1,"column":9}}}],"kind":"let","loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}],"sourceType":"script","loc":{"start":{"line":1,"column":0},"end":{"line":1,"column":10}}}'
        );
    });
});
var codeJson = parseCode('let a = 1;');
let data = extractData(codeJson);
var varaiable_a;
for (var i = 0; i < data.length; i++) {
    if(data[i]['Name'] == 'a'){
        varaiable_a = data[i];
    }
}

describe('The javascript parser', () => {
    it('is extracting data from a variable declaration correctly', () => {
        assert.equal(varaiable_a['Line'],1);
        assert.equal(varaiable_a['Type'],'variable declaration');
        assert.equal(varaiable_a['Name'],'a');
        assert.equal(varaiable_a['Value'],1);
    });

});

codeJson = parseCode(`function binarySearch(X, V, n){
    return -1;
}`);
data = extractData(codeJson);
data = extractData(codeJson);
var func_bin;
var prm_x;
for (i = 0; i < data.length; i++) {
    if(data[i]['Name'] == 'binarySearch'){
        func_bin = data[i];
    }
    if(data[i]['Name'] == 'X' && data[i]['Type'] == 'Param'){
        prm_x = data[i];
    }
}
describe('The javascript parser', () => {
    it('is extracting data from a function declaration correctly', () => {
        assert.equal(func_bin['Line'],1);
        assert.equal(func_bin['Type'],'function declaration');
        assert.equal(func_bin['Name'],'binarySearch');
        assert.equal(func_bin['Value'],'');
        assert.equal(prm_x['Line'],1);
        assert.equal(prm_x['Type'],'Param');
        assert.equal(prm_x['Name'],'X');
        assert.equal(prm_x['Value'],'');
    });
});

codeJson = parseCode(`function binarySearch(X, V, n){
    let low, high, mid;
    low = 0;
    high = n - 1;
}`);
data = extractData(codeJson);
var ass_exsp;
for (i = 0; i < data.length; i++) {
    console.log(data[i]);
    if(data[i]['Type'] == 'assignment expression' && data[i]['Name'] == 'low'){
        ass_exsp = data[i];
    }
}

describe('The javascript parser', () => {
    it('is extracting data from an expression statement correctly', () => {
        assert.equal(ass_exsp['Line'],3);
        assert.equal(ass_exsp['Type'],'assignment expression');
        assert.equal(ass_exsp['Name'],'low');
        assert.equal(ass_exsp['Value'],0);
    });
});


