const postBtn = async (e) => {
    e.preventDefault();


    const response = await fetch("/api/blog-post/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/api/blog-post/new")
    }


}

let btn = document.querySelector("#postBtn");

btn.addEventListener("click", postBtn);