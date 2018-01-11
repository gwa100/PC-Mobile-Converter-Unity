window.onload = function () {
    $("#input").on("change", run);
}


function run() {
    let inText = $("#input").val();
    let converted = convert(inText);
    $("#output").val(converted.main);
    $("#inLabel").val(converted.inLabel);
    $("#outLabel").val(converted.outLabel);
}


function convert(text) {
    let temp = decode(text);
    let outLabel = temp.saveOrigin;
    let temp2 = converter[outLabel](temp);
    console.log(temp.saveOrigin, temp2.saveOrigin);
    return {
        main: encode(temp2),
        inLabel: outLabel,
        outLabel: temp2.saveOrigin
    }
}


const converter = {
    "pc": function (object) {
        let temp3 = object;
        temp3.rubies = Math.round(object.rubies / 10);
        temp3.saveOrigin = "mobile";
        temp3.readPatchNumber = "2.5.0";
        return temp3;
    },
    "mobile": function (object) {
        let temp4 = object;
        temp4.rubies = Math.round(object.rubies * 10);
        temp4.saveOrigin = "pc";
        temp4.readPatchNumber = "1.0e10";
        return temp4;
    }
}

function encode(data) {
    console.log("Encoded(n): ", data);
    let hash = "7a990d405d2c6fb93aa8fbb0ec1a3b23";
    data = JSON.stringify(data);
    let encodedData = pako.deflate(data, { to: 'string' });
    return hash + btoa(encodedData);

}

function decode(data) {
    let result = data.slice(32)
    data = pako.inflate(atob(result), { to: 'string' });
    data = JSON.parse(data);
    console.log("Decoded(n): ", data);
    return data;

}