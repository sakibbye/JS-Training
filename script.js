const signUp = e => {
    let fname = document.getElementById('fname').value,
        lname = document.getElementById('lname').value,
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
            "fname":fname, 
            "lname":lname,
            "email":email,
            "pwd":pwd })
        localStorage.setItem('users', JSON.stringify(user_records));
        alert("Account Created.\nPlease Sign In to continue.");
    7}
    e.preventDefault();
}

    

function signIn(e) {
    let email = document.getElementById('email').value, 
        pwd = document.getElementById('pwd').value;

        let user_records=new Array();
        user_records=JSON.parse(localStorage.getItem("users"))?JSON.parse(localStorage.getItem("users")):[]
        if(user_records.some((v)=>{return v.email==email && v.pwd==pwd}))
        {
            console.log("Login Pass");
            window.location.href="profile.html"
        }
        else
        {
          alert('Login Fail');
        }
        
    e.preventDefault();
}

    