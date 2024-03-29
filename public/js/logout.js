const logoutHandler = async () => {
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application'},
    });
    if(response.ok){
        document.location.replace('/');
        alert('You have logged out!')
    }else {
        alert('Failed to log out!')
    }
};

document.querySelector('#logout').addEventListener('click', logoutHandler, false);