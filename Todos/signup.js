let users = JSON.parse(localStorage.getItem('users'));
console.log(users)
if (users === null){
    users = []
}

document.querySelector("form").addEventListener("submit",submitData);

function submitData(event){
    event.preventDefault();
    let name=document.querySelector("#name").value;
    let email=document.querySelector("#email").value;

    let isEmailExist;
    
    if (users.length !== 0){
        isEmailExist = users.find((user)=>{
            if (email === user.email){
                return true
            }
        })
    }

    if (isEmailExist){
        alert("Email already exist")
        return
    }
    
    let signUp={
        name,
        email,
        isLogin: false,
        todoList: []
    }
    users.push(signUp)
    localStorage.setItem("users",JSON.stringify(users));

    alert("Account Created Successfully")
    window.location.href="login.html"
}