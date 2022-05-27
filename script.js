let currentProductID;

function fetchProducts() {
    let body = document.getElementsByClassName("products-div")[0];
    let p = document.createElement('p');
    p.innerText = 'loading...';
    p.setAttribute('id', 'loading');
    body.appendChild(p);

    fetch('http://localhost:3000/products',
        {
            method:'get'
        }   
    ).then(function(response){
        response.json().then((data)=>{
            if(data.length) {
                console.log(data);
                body.removeChild(p);
            }

            for(let i=0; i<data.length; i++) {
                let div_section = document.createElement('div')
                div_section.classList.add('advertisment-div')

                let image = document.createElement('img');
                image.setAttribute('src', data[i].img);
                image.width=100;
                div_section.appendChild(image);

                let h2 = document.createElement('h2');
                h2.innerText=data[i].name;
                div_section.appendChild(h2);

                let edit = document.createElement('button');
                edit.innerText = 'Edit';
                edit.onclick = function() {
                    document.getElementById('name').value = data[i].name;
                    document.getElementById('image').value = data[i].img;
                    currentProductID = data[i].id;
                }
                div_section.appendChild(edit);

                let Delete = document.createElement('button');
                Delete.innerText = 'Delete';
                Delete.onclick = function() {
                    deleteProduct(data[i].id);
                }
                div_section.appendChild(Delete);

                let hr = document.createElement('hr');
                div_section.appendChild(hr);
                body.appendChild(div_section);
            }
        })
    })
}

function addProduct() {
    let body = document.getElementsByTagName('body')[0];
    let name = document.getElementById('name').value;
    let image = document.getElementById('image').value;

    let newProduct = {
        name: name,
        img: image
    }

    fetch('http://localhost:3000/products', 
        {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newProduct)
        }).then(function(response) {
            window.location.reload();
        })
}

function updateProduct() {
    let name = document.getElementById('name').value;
    let image = document.getElementById('image').value;
    let newProduct = {
        name: name,
        img: image
    }

    fetch('http://localhost:3000/products/' + currentProductID, 
    {
        method: 'put',
        headers:  {'Content-Type': 'application/json'},
        body: JSON.stringify(newProduct)
    }).then(function(response) {
        window.location.reload();
    })
}

function deleteProduct(id) {
    let name = document.getElementById('name').value;
    let image = document.getElementById('image').value;

    fetch('http://localhost:3000/products/' + id, 
    {
        method: 'delete'
    }).then(function(response) {
        window.location.reload();
    })
}


fetchProducts();