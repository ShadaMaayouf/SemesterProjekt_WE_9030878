

console.log('Hello from u6_a2.html');

const finalText = document.querySelector('p');

//fetch gibt ein Promise zurück; wird dieses Promise resolved, wird die Response des fetch als value im resolve an das then weitergegeben
//die handler Function im then erhält die Response aus dem resolve der vorherigen Promise als Parameter
//das then gibt ein Promise zurück, das resolved wird, wenn die handler-Funktion einen Wert zurückliefert
//(gibt die handler-Funktion eine Exception zurück, wird das Promise des then rejected; wird vom handler ein Promise zurückgegeben, nimmt das äußere Promise vom then den Status des inneren Promise vom handler an)
//wenn alle Promises im Promise.all erfüllt werden, wird das davon zurückgegebene Promise auch resolved
//der value des resolve vom Promise.all ist dann ein Array mit den values der resolves aus den Promises des Arrays
//hier: ein Array mit zwei Text-Elementen
function fetchTexts() {
    return Promise.all([
        fetch('A.txt').then(response => response.text()),
        fetch('B.txt').then(response => response.text())
    ]);
}

function splitTexts(fetchedTexts) {
    return [fetchedTexts[0].toString().split('\n'),
        fetchedTexts[1].toString().split('\n')];
}

function concatLines(textsAsLineArray) {
    let res ="";

    //parallele Bearbeitung bis ein Array mehr Elemente (Text mehr Zeilen) hat
    for(var i = 0; i<textsAsLineArray[0].length && i<textsAsLineArray[1].length; ++i){
        res = res.concat('<mark>', textsAsLineArray[0][i], '</mark>', '<b>---CUT---</b>', textsAsLineArray[1][i], '<br>');
    }
    //Bearbeitung der Zeilen, die der zweite Text mehr hat
    if(textsAsLineArray[0].length < textsAsLineArray[1].length) {
        for(var i = textsAsLineArray[0].length; i<textsAsLineArray[1].length; ++i){
            res = res.concat(textsAsLineArray[1][i], '<br>');
        }
    }
    //Bearbeitung der Zeilen, die der erste Text mehr hat
    if(textsAsLineArray[0].length > textsAsLineArray[1].length) {
        for(var i = textsAsLineArray[1].length; i<textsAsLineArray[0].length; ++i){
            res = res.concat('<mark>', textsAsLineArray[0][i], '</mark>', '<br>');
        }
    }

    return res;
}

//Promise Chaining
//fetchTexts().then(fetchedTexts => workWithTexts(fetchedTexts))

//async/await
async function waitForTextsThenWork() {
    //var fetchedTexts = await fetchTexts();
    //workWithTexts(fetchedTexts);
    workWithTexts(await fetchTexts());
}

function workWithTexts(fetchedTexts) {
    console.log(fetchedTexts);
    const lineArrays = splitTexts(fetchedTexts);
    console.log(lineArrays[0]);
    console.log(lineArrays[1]);
    const concText = concatLines(lineArrays);
    console.log(concText);
    finalText.innerHTML = concText;
}

waitForTextsThenWork();

