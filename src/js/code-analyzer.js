import * as esprima from 'esprima';

//All the handlers do similare thing. Calculates the element specific data and returns it
var handlers = {
    FunctionDeclaration : funcDeclHandler,
    VariableDeclaration : varDeclHandler,
    ExpressionStatement : exspStatHandler,
    WhileStatement : whileHandler,
    IfStatement : ifHandler,
    ReturnStatement : retHandler
};

// handlers['FunctionDeclaration'] = funcDeclHandler;
// handlers['VariableDeclaration'] = varDeclHandler;
// handlers['ExpressionStatement'] = exspStatHandler;
// handlers['WhileStatement'] = whileHandler;
// handlers['IfStatement'] = ifHandler;
// handlers['ReturnStatement'] = retHandler;

const parseCode = (codeToParse) => {
    return esprima.parseScript(codeToParse, {loc: true});
};

//Recursive function that extracs all the ements of the code described in the given jsn element
function extractData(codeJson) {
    var ans = [];
    if(codeJson.hasOwnProperty('body')){
        if(codeJson['body'] instanceof Array){
            var body_array = codeJson['body'];
            for (var i = 0; i < body_array.length; i++) {
                ans.push.apply(ans ,extractData(body_array[i]));
            }
        }else{
            extractData(codeJson['body']);
        }
    }
    if(codeJson.type in handlers){
        ans.push.apply(ans ,handlers[codeJson.type](codeJson));
    }
    return ans;
}


function funcDeclHandler(funcJson) {
    var ans = [];
    ans.push(
        create_new_elem(funcJson.loc.start.line,funcJson.type,funcJson.id.name,'')
    );
    for (var i = 0; i < funcJson.params.length; i++) {
        var param = funcJson.params[i];
        ans.push(
            create_new_elem(param.loc.start.line,'Param',param.name,'')
        );
    }
    return ans;
}

function varDeclHandler(verDecJson) {
    var ans = [];
    var declerators = verDecJson.declarations;
    for (var i = 0; i < declerators.length; i++) {
        ans.push(
            create_new_elem(
                declerators[i].loc.start.line,
                declerators[i].type,
                declerators[i].id.name,
                declerators[i].init.value)
        );
    }
    return ans;
}

function exspStatHandler(expStatJson) {
}

function whileHandler(whileJson) {
}

function ifHandler(ifJson) {
}

function retHandler(retJson) {
}

//Function that creates an element given it's neccesary details
function create_new_elem(line,type, name, value){
    return {
        Line : line,
        Type: type,
        Name: name,
        Value: value
    };
}
export {parseCode};
export {extractData};