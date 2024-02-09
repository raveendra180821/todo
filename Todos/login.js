document.querySelector("form").addEventListener("submit",goToHome);
let users = JSON.parse(localStorage.getItem("users"))
console.log(users)

function goToHome(event){
    event.preventDefault();
    let emailId=document.querySelector("#ipEmailPhone").value;
    
    let isValidUser = users.find((user)=>{
        if (user.email === emailId){
            return true
        }else{
            return false
        }
    })
    
    if(users !== null && isValidUser){
        users = users.map((user) => {
            if (user.email === emailId){
                return {...user,isLogin: true}
            }else{
                return user
            }
        })

        localStorage.setItem("users", JSON.stringify(users))
        window.location.href="todo.html"
    } else {
        alert("Wrong Credentials  (If you don't have account click signup)")
    } 
}

document.querySelector("#gotoSignUp").addEventListener("click",gotoSignUp);
function gotoSignUp(){
    window.location.href="signup.html"
}
