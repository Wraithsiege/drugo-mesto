function init(){
    const cookies = document.cookie.split("=");
    const token = cookies[cookies.length - 1];

    fetch("http://127.0.0.1:8000/api/users", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    document.getElementById("logout").addEventListener("click", e => {
        document.cookie = `token=;SameSite=Lax`;
        window.location.assign("http://127.0.0.1:8000/login");
    })
}