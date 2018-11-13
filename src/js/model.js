var data = [];

const storeData = (codeJson) => {
    data = extractData(codeJson);
};

//Recursive function that extracs all the ements of the code described in the given jsn element
function extractData(codeJson) {
    return [];
}

//Function that returns the data
const getData = () => {
    return data;
};


export {storeData};
export {getData};
