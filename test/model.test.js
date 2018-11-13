import assert from 'assert';
import {storeData} from '../src/js/model';
import {getData} from '../src/js/model';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript model', () => {
    var codeJson = JSON.stringify(parseCode('let a = 1;'));
    storeData(codeJson);
    var data = getData();
    var varaiable_a;
    for (var i = 0; i < data.length; i++) {
        if(data[i]['Name'] == 'a'){
            varaiable_a = data[i];
        }
    }
    assert.equal(varaiable_a['Line'],1);
    assert.equal(varaiable_a['Type'],'variable declaration');
    assert.equal(varaiable_a['Name'],'a');
    assert.equal(varaiable_a['Condition'],'');
    assert.equal(varaiable_a['Value'],1);
});


