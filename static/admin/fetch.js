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

function fetchUsers(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/users", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("usersList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Username: ${el.username}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/users/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find User With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("username").value = `${el.username}`
                    document.getElementById("email").value = ""
                    document.getElementById("password").value = ""
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        window.location.assign("http://127.0.0.1:8000/register");

        cookies = null;
        token = null;
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            value: document.getElementById("value").value
        }

        fetch(`http://127.0.0.1:8000/api/users/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/users/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchBooks(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/books", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("booksList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Title: ${el.title}, Author: ${el.author}, Genre: ${el.genre}, Publisher: ${el.publisher}, Price: ${el.price}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/books/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Book With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("title").value = `${el.title}`
                    document.getElementById("author").value = `${el.author}`
                    document.getElementById("genre").value = `${el.genre}`
                    document.getElementById("publisher").value = `${el.publisher}`
                    document.getElementById("price").value = `${el.price}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            genre: document.getElementById("genre").value,
            publisher: document.getElementById("publisher").value,
            price: document.getElementById("price").value
        }

        fetch("http://127.0.0.1:8000/api/books", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("booksList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.id}, Title: ${el.title}, Author: ${el.author}, Genre: ${el.genre}, Publisher: ${el.publisher}, Price: ${el.price}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            title: document.getElementById("title").value,
            author: document.getElementById("author").value,
            genre: document.getElementById("genre").value,
            publisher: document.getElementById("publisher").value,
            price: document.getElementById("price").value
        }

        fetch(`http://127.0.0.1:8000/api/books/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/books/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchWritingAccessories(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/writing_accessories", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("writingAccessoriesList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Manufacturer: ${el.manufacturer}, Type: ${el.type}, Color: ${el.color}, Price: ${el.price}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/writing_accessories/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Writing Accessory With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("manufacturer").value = `${el.manufacturer}`
                    document.getElementById("type").value = `${el.type}`
                    document.getElementById("color").value = `${el.color}`
                    document.getElementById("price").value = `${el.price}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            color: document.getElementById("color").value,
            price: document.getElementById("price").value
        }

        fetch("http://127.0.0.1:8000/api/writing_accessories", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("writingAccessoriesList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.id}, Manufacturer: ${el.manufacturer}, Type: ${el.type}, Color: ${el.color}, Price: ${el.price}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            color: document.getElementById("color").value,
            price: document.getElementById("price").value
        }

        fetch(`http://127.0.0.1:8000/api/writing_accessories/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/writing_accessories/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchMovies(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/movies", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("moviesList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Genre: ${el.genre}, Price: ${el.price}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/movies/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Movie With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("name").value = `${el.name}`
                    document.getElementById("genre").value = `${el.genre}`
                    document.getElementById("price").value = `${el.price}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            name: document.getElementById("name").value,
            genre: document.getElementById("genre").value,
            price: document.getElementById("price").value
        }

        fetch("http://127.0.0.1:8000/api/movies", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("moviesList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Genre: ${el.genre}, Price: ${el.price}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            name: document.getElementById("name").value,
            genre: document.getElementById("genre").value,
            price: document.getElementById("price").value
        }

        fetch(`http://127.0.0.1:8000/api/movies/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/movies/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchCongratulationsCards(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/congratulations_cards", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("congratulationsCardsList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Type: ${el.type}, Price: ${el.price}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/congratulations_cards/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Congratulations Card With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("type").value = `${el.type}`
                    document.getElementById("price").value = `${el.price}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            type: document.getElementById("type").value,
            price: document.getElementById("price").value
        }

        fetch("http://127.0.0.1:8000/api/congratulations_cards", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("congratulationsCardsList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.id}, Type: ${el.type}, Price: ${el.price}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            type: document.getElementById("type").value,
            price: document.getElementById("price").value
        }

        fetch(`http://127.0.0.1:8000/api/congratulations_cards/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/congratulations_cards/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchSchoolAccessories(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/school_accessories", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("schoolAccessoriesList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Manufacturer: ${el.manufacturer}, Type: ${el.type}, Color: ${el.color}, Price: ${el.price}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/school_accessories/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find School Accessory With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("manufacturer").value = `${el.manufacturer}`
                    document.getElementById("type").value = `${el.type}`
                    document.getElementById("color").value = `${el.color}`
                    document.getElementById("price").value = `${el.price}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            color: document.getElementById("color").value,
            price: document.getElementById("price").value
        }

        fetch("http://127.0.0.1:8000/api/school_accessories", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("schoolAccessoriesList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.id}, Manufacturer: ${el.manufacturer}, Type: ${el.type}, Color: ${el.color}, Price: ${el.price}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            color: document.getElementById("color").value,
            price: document.getElementById("price").value
        }

        fetch(`http://127.0.0.1:8000/api/school_accessories/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/school_accessories/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchToys(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/toys", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("toysList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Manufacturer: ${el.manufacturer}, Type: ${el.type}, Name: ${el.name}, Color: ${el.color}, Price: ${el.price}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/toys/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Toy With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("manufacturer").value = `${el.manufacturer}`
                    document.getElementById("type").value = `${el.type}`
                    document.getElementById("name").value = `${el.name}`
                    document.getElementById("color").value = `${el.color}`
                    document.getElementById("price").value = `${el.price}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            name: document.getElementById("name").value,
            color: document.getElementById("color").value,
            price: document.getElementById("price").value
        }

        fetch("http://127.0.0.1:8000/api/toys", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("toysList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.id}, Manufacturer: ${el.manufacturer}, Type: ${el.type}, Name: ${el.name}, Color: ${el.color}, Price: ${el.price}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            manufacturer: document.getElementById("manufacturer").value,
            type: document.getElementById("type").value,
            name: document.getElementById("name").value,
            color: document.getElementById("color").value,
            price: document.getElementById("price").value
        }

        fetch(`http://127.0.0.1:8000/api/toys/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/toys/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchMusic(){
    let status = 0;

     document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];
    
        fetch("http://127.0.0.1:8000/api/music", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
         })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("musicList");
        
                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Album Name: ${el.albumName}, Performer: ${el.performer}, Genre: ${el.genre}, Price: ${el.price}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/music/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Album With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("albumName").value = `${el.albumName}`
                    document.getElementById("performer").value = `${el.performer}`
                    document.getElementById("genre").value = `${el.genre}`
                    document.getElementById("price").value = `${el.price}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            albumName: document.getElementById("albumName").value,
            performer: document.getElementById("performer").value,
            genre: document.getElementById("genre").value,
            price: document.getElementById("price").value
        }
    
        fetch("http://127.0.0.1:8000/api/music", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
         })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("musicList");
                if(el == null && el == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successfull");
                    list.innerHTML += `<li>ID: ${el.id}, Album Name: ${el.albumName}, Performer: ${el.performer}, Genre: ${el.genre}, Price: ${el.price}</li>`;
                }
            })
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            albumName: document.getElementById("albumName").value,
            performer: document.getElementById("performer").value,
            genre: document.getElementById("genre").value,
            price: document.getElementById("price").value
        }
    
        fetch(`http://127.0.0.1:8000/api/music/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/music/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
         })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchGiftCards(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/gift_cards", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("giftCardsList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.id}, Value: ${el.value}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/gift_cards/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Gift Card With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("value").value = `${el.value}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            value: document.getElementById("value").value
        }

        fetch("http://127.0.0.1:8000/api/gift_cards", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("giftCardsList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.id}, Value: ${el.value}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            value: document.getElementById("value").value
        }

        fetch(`http://127.0.0.1:8000/api/gift_cards/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/gift_cards/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}

function fetchMessages(){
    let status = 0;

    document.getElementById("back").addEventListener("click", e => {
        window.location.assign("http://127.0.0.1:8000/admin");
    })

    document.getElementById("getAllbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        fetch("http://127.0.0.1:8000/api/messages", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then( res => res.json() )
            .then( data => {
                const list = document.getElementById("messagesList");

                data.forEach( el => {
                    if(status == 0){
                        list.innerHTML += `<li>ID: ${el.username}, Content: ${el.content}</li>`;
                    }
                });
                status = 1;
            });
    })

    document.getElementById("getOnebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }
    
        fetch(`http://127.0.0.1:8000/api/messages/${data.id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
         })
            .then( res => res.json() )
            .then( el => {
                if(el == null){
                    alert("Cannot Find Message With ID " + `${document.getElementById("id").value}` + " In Database");
                }
                else{
                    document.getElementById("content").value = `${el.content}`
                }
            })
    })

    document.getElementById("addbtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            content: document.getElementById("content").value
        }

        fetch("http://127.0.0.1:8000/api/messages", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                const list = document.getElementById("messagesList");
                if(el.id == null && el.id == undefined){
                    alert("Failed To Post");
                }
                else{
                    alert("Post Successful");
                    list.innerHTML += `<li>ID: ${el.username}, Content: ${el.content}</li>`;
                }
            });
    })

    document.getElementById("updatebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            content: document.getElementById("body").value
        }

        fetch(`http://127.0.0.1:8000/api/messages/${document.getElementById("id").value}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(el.id == null){
                    alert("Update Failed");
                }
                else{
                    alert("Update Successful");
                }
            })
    })

    document.getElementById("deletebtn").addEventListener("click", e => {
        e.preventDefault();

        const cookies = document.cookie.split("=");
        const token = cookies[cookies.length - 1];

        const data = {
            id: document.getElementById("id").value
        }

        fetch(`http://127.0.0.1:8000/api/messages/${data.id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if(`${el.id}` != `${data.id}`){
                    alert("Delete Failed! Element With ID " + `${data.id}` + " Doesnt Exist");
                }
                else{
                    alert("Delete Successful! Element With ID " + `${data.id}` + " Successfully Removed");
                }
            })
    })
}