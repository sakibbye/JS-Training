
let name=localStorage.getItem('name')?localStorage.getItem('name'):''
console.log(name);
if(name!='')
{
    alert('You already Logged in');
    window.location.href="profile.html";
}    

function signIn(e) {
    let email = document.getElementById('email').value, 
        pwd = document.getElementById('pwd').value;

        let user_records=new Array();
        user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
        if(user_records.some((v)=>{return v.email==email && v.pwd==pwd}))
        {
            console.log("Login Pass");
            let current_user = user_records.filter((v)=>{return v.email==email && v.pwd==pwd})[0];
            localStorage.setItem('name', current_user.name);
            localStorage.setItem('email', current_user.email);
            window.location.href = "profile.html";
        }
        else
        {
          alert('Login Fail');
        }
        
    e.preventDefault();
}
