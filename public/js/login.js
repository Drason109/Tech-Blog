const loginFormHandler = async (event) => {
    event.preventDefault();
        
       const usernameEl = document.querySelector("#username-login").value.trim();
       const passwordEl = document.querySelector("#password-login").value.trim();
    
    if(usernameEl && passwordEl) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username: usernameEl,
                password: passwordEl}),
            headers: {'Content-Types': 'appication/json'},
        });
        if(response.ok){
            document.location.replace('/');
        }else {
            alert('Failed to Log in');
        }
    }
};

document.querySelector('#login').addEventListener('submit', loginFormHandler, false);