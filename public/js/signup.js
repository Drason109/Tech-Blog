const signupFormHandler = async(event) => {
    event.preventDefualt();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
   console.log(userObj)
   fetch("/api/user", {
    method: "POST",
    body: JSON.stringify({
        username: username,
        password: password,
    }),
    headers: {
        "Content-Types": "application/json"
    },
   }).then(res => {
    if(res.ok){
        console.log("user is signed up")
        document.location.replace("/dashboard");
    }else{
        alert("please try again")
    }
   })
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler, false);