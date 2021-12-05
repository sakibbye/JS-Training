
let name=localStorage.getItem('name')?localStorage.getItem('name'):''
console.log(name);
if(name=='')
{
    console.log('Please Login');
    window.location.href="signin.html";
}

let email=localStorage.getItem('email');
document.getElementById("name").innerHTML = name;
document.getElementById("email").innerHTML = email;

function logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    window.location.href="signin.html";
}    