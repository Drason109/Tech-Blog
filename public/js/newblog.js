

var existingBlogs = document.querySelector("existingblogs");
var createBlog = document.querySelector("#createBlog");
var newPost = document.querySelector("newpost");
var newBlog = document.querySelector("#newBlog");

function hide() {
    createBlog.hidden=true;
}

hide();

newPost.addEventListener("submit", event => {
    event.preventDefault();
    console.log('click');
    existingBlogs.hidden=true;
    newPost.hidden=true;
    newBlog.hidden=false;
});

newBlog.addEventListener("submit", event => {
    var title = document.querySelector("title").value;
    var content = document.querySelector("#content").value;
    event.preventDefault()
    console.log('submitted');
    if(!title || !content){
        alert('please enter both title and content')
        return;
    }
    const blogObj = {
        title: title,
        content: content,
    }
    fetch("/api/blogs", {
        method: "POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res=>{
        if(res.ok){
            createBlog.setAttribute("hidden", "false")
            location.reload()
        }else{
            alert("error - please try again")
        }
    })

})

