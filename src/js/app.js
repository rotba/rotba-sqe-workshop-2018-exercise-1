import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {extractData} from './code-analyzer';
import {storeData} from './model';
import {createHTMLTabel} from './view_handler';
import {Vcount} from './view_handler';

//var attrNamesEnum = Object.freeze({'Line':'Line', 'Type':'Type', 'Name':'Name', 'Condition':'Condition', 'Value':'Value'});

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let data_array = extractData(parsedCode);
        storeData(data_array);
        createHTMLTabel(data_array, document, 'myTable');
        Vcount(document);
    });
});

//export {attrNamesEnum};
