const postBtn = async (e) => {
    e.preventDefault();



    const blog_title = document.getElementById("blog-title").value;
    const blog_content = document.getElementById("blog-content").value;

    const errorMessage = document.getElementById("error-message").textContent = "";


    if (!blog_title || !blog_content) {
        errorMessage.textContent = "Please enter all fields."
        return;
    }


    if (blog_title && blog_content) {
        const response = await fetch("/api/blog-post", {
            method: "POST",
            body: JSON.stringify({ blog_title, blog_content }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            document.location.replace("/profile");
        } else {
            alert(response.statusText);
        }
    }


}

let btn = document.querySelector("#postBtn");

btn.addEventListener("submit", postBtn);