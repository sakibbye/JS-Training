let name=localStorage.getItem('name')?localStorage.getItem('name'):''
console.log(name);
if(name!='')
{
    alert('You already Logged in. Please Logout first');
    window.location.href="profile.html";
}    

const signUp = e => {
    let name = document.getElementById('name').value,
        email = document.getElementById('email').value,
        pwd = document.getElementById('pwd').value;

    let user_records=new Array();
    user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
    
    if(user_records.some((v)=>{return v.email==email}))
    {
        alert("duplicate data");
    }
    else
    {
        user_records.push({ 
            "name":name, 
            "email":email,
            "pwd":pwd })
        localStorage.setItem('users', JSON.stringify(user_records));
        alert("Account Created.\nPlease Sign In to continue.");
        window.location.href="index.html"
    }
    e.preventDefault();
}
