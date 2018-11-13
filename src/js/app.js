import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {storeData} from './model';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        let storedData = storeData(parsedCode);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });
});
