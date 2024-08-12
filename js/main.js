var nameinput = document.getElementById("name");
var urlinput = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tablebody");

var mainindex = 0;
var bookmarks;

var nameregex=/^[A-Za-z_]{1,}$/
function isname(){
    if(nameregex.test(nameinput.value)){
        return true;
    }else{return false;}
}

var urlregex=/^(https:\/\/)?(www\.)?[a-zA-Z0-9_\.]{1,}\.[a-z]{3}$/
function isurl(){
    if(urlregex.test(urlinput.value)){
        return true;
    }else{return false;}
}

nameinput.onkeyup = function() {
    if(isname() && isurl()){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.disabled="true";
    }
}

urlinput.onkeyup = function() {
    if(isname() && isurl()){
        addBtn.removeAttribute("disabled");
    }else{
        addBtn.disabled="true";
    }
}



if (localStorage.getItem("bookmarks") == null) {
    bookmarks = [];
} else {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    display(bookmarks);
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == "update") {
        addBtn.innerHTML = "Submit";
        var bookmark = {
            name: nameinput.value,
            url: urlinput.value
        }
        bookmarks.splice(mainindex, 1, bookmark);
    } else {
        var bookmark = {
            name: nameinput.value,
            url: urlinput.value

        }
        bookmarks.push(bookmark);
    }

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
    display(bookmarks);
    clear();
}

function display(arry) {
    var marks = ``;
    for (var i = 0; i < arry.length; i++) {
        marks += `
        <tr>
           <td><h6 class="px-5 mx-5">${arry[i].name}</h6></td>
           <td><button type="button"  class="btn btn-warning px-3 mx-3">visit</button></td>
           <td><button type="button"  onclick="updatebook(${i})" class="btn btn-success px-3 mx-3">update</button></td>
           <td><button type="button"  onclick="Deletebook(${i})" class="btn btn-danger px-3 mx-3">Delete</button></td>
        </tr>
        `
    }
    tableBody.innerHTML = marks;
}


function Deletebook(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    display(bookmarks);
}

function clear() {
    nameinput.value = "";
    urlinput.value = "";
}

function updatebook(index) {
    nameinput.value = bookmarks[index].name;
    urlinput.value = bookmarks[index].url;
    addBtn.innerHTML = "update"
    mainindex = index;
}


function search(term) {
  
    
    var wantedbook = [];
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name.toLowerCase().includes(term)) {
            wantedbook.push(bookmarks[i])
        }
    }
    display(wantedbook);
 }

