import assert from 'assert';
import {createHTMLTabel} from '../src/js/view_handler';
import {extractData, parseCode} from '../src/js/code-analyzer';


var codeJson = parseCode('let a = 1;');
let data = extractData(codeJson);
let table  = createHTMLTabel(data, )

describe('The view handler', () => {
    it('inserting data properly to the table', () => {
        assert.equal(
            JSON.stringify(parseCode('')),
            '{"type":"Program","body":[],"sourceType":"script","loc":{"start":{"line":0,"column":0},"end":{"line":0,"column":0}}}'
        );
    });
});