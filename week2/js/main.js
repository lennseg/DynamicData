document.getElementById("rum").style.fontSize = "11pt";

document.getElementById("fruit").style.fontSize = "11pt";

document.getElementById("mojitoName").style.fontSize = "11pt";

document.getElementById("inputEmail").style.fontSize = "11pt";

document.getElementById("inputPassword").style.fontSize = "11pt";

function mDown(obj) {
    obj.style.backgroundColor = "turquoise";
    obj.innerHTML = "Release Me";
}

function mUp(obj) {
    obj.style.backgroundColor = "red";
    obj.innerHTML = "Thank You";
}

function mOver(obj) {
    obj.innerHTML = "Are You Sure?";
}

function mOut(obj) {
    obj.innerHTML = "DONE!";
}
