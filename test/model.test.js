import assert from 'assert';
import {parseCode} from '../src/js/model';

describe('The javascript model', () => {
    it('is storing parsed simple variable declaration correctly', () => {
        var codeJson = JSON.stringify(parseCode('let a = 1;');
        storeData(codeJson)
        assert.equal(data.length,1);
        var element = data[0];
        assert.equal(element['Line'],1);
        assert.equal(element['Type'],'variable declaration');
        assert.equal(element['Name'],'a');
        assert.equal(element['Condition'],'');
        assert.equal(element['Value'],1);
    });
});


