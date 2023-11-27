const backendurl = "http://localhost:8080/api"

export async function POST(url, request){
    
    return await fetch(backendurl + url, {
        method:'POST', 
        mode:'cors', 
        headers:{ 
            //'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || '' 
        },
        body: request//JSON.stringify(request) 
    })
    .then((res) => res.json())
    .then((res) => res) 
    .catch((err) => err); 
}

export async function GET(url, request = null){
    
    let uri = "";
    if(request){
        uri = '?' + new URLSearchParams(request).toString(); 
    }
    
    return await fetch(backendurl + url + uri, {
        method:'GET',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || ''
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}


export async function PATCH(url, request){
    
    return await fetch(backendurl + url, {
        method:'PATCH',
        mode:'cors',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || '',
            //'Content-Type':'application/json'
        },
        body: request //JSON.stringify(request)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

export async function DELETE(url, request){

    let uri = "";
    if(request){
        uri = '?' + new URLSearchParams(request).toString();
    }

    return await fetch(backendurl + url + uri, {
        method:'DELETE',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || ''
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}

export async function POSTU(url, file){

    let data = new FormData();
    data.append('file', file);

    return await fetch(backendurl + url, {
        method:'POST',
        mode:'cors',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('access_token')}` || ''
        },
        body: data
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((err) => err);
}