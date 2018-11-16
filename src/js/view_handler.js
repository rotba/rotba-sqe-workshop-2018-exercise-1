var tableColsEnmt = Object.freeze({'Line':0, 'Type':1, 'Name':2, 'Condition':3, 'Value':4});


function createHTMLTabel(data_array, index_document, table_id) {
    var table = index_document.getElementById(table_id);
    for (var i = 0; i < data_array.length; i++) {
        var row = table.insertRow(i+1);
        var lineCell = row.insertCell(tableColsEnmt.Line);
        var typeCell = row.insertCell(tableColsEnmt.Type);
        var nameCell = row.insertCell(tableColsEnmt.Name);
        var conditionCell = row.insertCell(tableColsEnmt.Condition);
        var valueCell = row.insertCell(tableColsEnmt.Value);
        lineCell.innerHTML = data_array[i]['Line'];
        typeCell.innerHTML = data_array[i]['Type'];
        nameCell.innerHTML = data_array[i]['Name'];
        conditionCell.innerHTML = data_array[i]['Condition'];
        valueCell.innerHTML = data_array[i]['Value'];
    }
    return table;
}

function Vcount(index_document) {
    var oTable = index_document.getElementById('myTable');
    var i;
    var rowLength = oTable.rows.length;
    for (i = 1; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        var temp1 = oCells[0].firstChild.data;
        var temp2 = oCells[1].firstChild.data;
        var temp3 = oCells[2].firstChild.data;
        var x =1;
    }
}

export {createHTMLTabel};
export {Vcount};