const formElement = document.getElementById("saveData");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    let dataConcepto = document.getElementById("dataConcepto").value;
    let dataMonto = document.getElementById("dataMonto").value;
    let dataFecha = document.getElementById("dataFecha").value;
    let dataTipo = document.getElementById("dataTipo").value;
    let dataProcess = {dataConcepto: dataConcepto, dataMonto: dataMonto, dataFecha: dataFecha, dataTipo: dataTipo}
    let dataJson = JSON.stringify(dataProcess);
    fetch('http://localhost:3000/', {
        method: 'Post',
        body: dataJson
    })
    console.log(dataJson)
})

fetch('http://localhost:3000/', ).then(x => x.json()).then(console.log);
