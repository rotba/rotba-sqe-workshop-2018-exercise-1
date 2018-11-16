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

var dict_type_type_name = {
    FunctionDeclaration : 'function declaration',
    VariableDeclaration : 'variable declaration',
    VariableDeclarator: 'variable declaration',
    AssignmentExpression: 'assignment expression',
    WhileStatement : 'while statement',
    IfStatement : 'if statement',
    ReturnStatement : 'return statement'
};


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
            ans.push.apply(ans ,extractData(codeJson['body']));
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
            create_new_elem(param.loc.start.line,'Param',param.name,'', '')
        );
    }
    return ans;
}

function varDeclHandler(verDecJson) {
    var ans = [];
    var declerators = verDecJson.declarations;
    for (var i = 0; i < declerators.length; i++) {
        var value = null;
        if(declerators[i].init != null){
            value = declerators[i].init.value;
        }
        ans.push(
            create_new_elem(
                declerators[i].loc.start.line,
                declerators[i].type,
                declerators[i].id.name,
                value,
                '')
        );
    }
    return ans;
}

function exspStatHandler(expStatJson) {
    var ans = [];
    ans.push(
        create_new_elem(
            expStatJson.loc.start.line,
            expStatJson.expression.type,
            expStatJson.expression.left.name,
            expStatJson.expression.right.value,
            ''
        )
    );
    return ans;
}

function whileHandler(whileJson) {
}

function ifHandler(ifJson) {
}

function retHandler(retJson) {
}

//Function that creates an element given it's neccesary details
function create_new_elem(line, type, name, value, condition){
    var type_actual = type;
    if(type in dict_type_type_name){
        type_actual =  dict_type_type_name[type];
    }
    return {
        Line : line,
        Type: type_actual,
        Name: name,
        Condition: condition,
        Value: value
    };
}
export {parseCode};
export {extractData};