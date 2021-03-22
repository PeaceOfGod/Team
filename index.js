// import {TOKEN} from './constants';
const TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MmViNDEyZC01YWI5LTRhY2QtOWU1ZC01NDY3ODIyMmQ0N2EiLCJqdGkiOiI5Y2QxMzZlYTEzNzRlYzI1ZmU5NmFhZGRjMzgxMDYyMmUwY2RkMzEzYzNhY2I5MzU0N2FmODkyNGQxYjJmYTk4YTVlYjljYzJiM2RiZjczOSIsImlhdCI6IjE2MTU0MzUwNDEuOTcwNzA5IiwibmJmIjoiMTYxNTQzNTA0MS45NzA3MTQiLCJleHAiOiIxNjQ2OTcxMDQxLjk2MjU3NyIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.TqSS_3i2JtF1AaMTJWrMyy4MnNfdV23mnAykXjOdkLwlOftWYPVf7zA5x1LYMp6PEqLRSDuLnUGCLXXqOVA2NxGouUVBffyyhhyKb6Rw8M8frNKzdUmLByKTKjna-Trz7SVMeV-ref5pVcj4IdngOYvwSq2ewgUxCkfCzCXSPiNYPruEc9Xy0Qi_X5XfL_vaYEKc1zTQq7SizTS1ntUZAZ49OR0pCN8IEEml64QknbM--OhfnUtwxZ8Er0i_hkYxp6hUKYrn5BBDgOD6RCsd6xV62jdzdU3D35HcplfMF-NQEg8MU3BsxEsxO8xkAIVbWrM4D7-dsRtPhPORLbPa9yQSv0FFoqIWuVKdh7d6qqcVVURlOR74p6q7QbKhwwjovxizo0Pbivmig6cQGRcx9mFoQA4s4KYFed4Gy0lwYdNhVuKMDX3xjSYbZOVmSs8ZMNj67A73KURTZfmlx2rpAUWZuWI8sg76Y3wVIeAYCO1mBhcbRV64pasePgHOAtsGiChZ2z2RwHD-Tu0T-r_TkNF-80iG6zsQ4EV4vpMNdf1NwnEE_9SrIa9mR6sWoE7uC_3Zge90rpWrUOmH-tmvlFSj-Vf22azEgyniuuRm37OE6mJ8zLeoj30HIFoZIh7EHRP7r4hvmSwb21SiWM4pnvHBWNLWC2E0OmnETN7Ms54'
const extraButtons = document.querySelector('.table-body');

const url = 'http://104.131.85.93/api/v1/super/teams/create';

const teamNameValue = document.querySelector(".team-name");
const teamDescriptionValue = document.querySelector(".team-desc");

function fetchData(){
    fetch('http://104.131.85.93/api/v1/super/teams', {        
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            'Authorization': `Bearer ${TOKEN}`,
        }
    }).then(response => {
        if (!response.ok){
            throw Error("ERROR");
        }
        return response.json();
    }).then (data => {
        const responseData = data.data ? data.data.data : '';
        const html = responseData.map(user => {
            return `            
            <tbody class="table-data" id="table-body">
                <tr id="row-id">
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.description}</td>
                    <td class="font-buttons" id="font-butt">
                        <i class="fas fa-user-edit" style="font-size: 25px; padding-right: 20px" id="edit-button" name="edit"></i>
                        <i class="fas fa-trash" style="font-size: 25px;" id="delete-button" name="delete"></i>
                    </td>          
                </tr> 
            </tbody>                       
            `;
        });
        document.querySelector("#table-id").innerHTML = html;        
    }).catch(error => {
        console.log(error);
    });
} 

fetchData();

extraButtons.addEventListener('click', (e) => {
    e.preventDefault();
    let delButton = e.target.id == 'delete-button';
    let editButton = e.target.id == 'edit-button';
    
    let id = e.target.parentElement.dataset.id;
    
    if(delButton) {
        fetch(`${url}/${id}`,{
            method: 'DELETE',
        })
        .then(response => response(json()))
        .then(() => location.reload())  
    }

    if (editButton) {
        const parent = e.target.parentElement;
        let teamNameContent = parent.querySelector('.team-name').textContent;
        let teamDescriptionContent = parent.querySelector('.team-desc').textContent;

        teamNameValue.value = teamNameContent;
        teamDescriptionValue.value = teamDescriptionContent;
    }
})

// function editButton(){

// }

// function deleteButton(){
//     fetch('http://104.131.85.93/api/v1/super/teams/create', {
//         method: 'DELETE',
//         headers: {
//             "Content-Type": "application/json",
//             'Authorization': `Bearer ${TOKEN}`,
//         },
//             Accept: "application/json",
//         body: JSON.stringify(myDataObject)
//     }).then(response => response.json())
//     .then(json => console.log(json));
// }




// const formSubmit = document.getElementById("team-form");

// formSubmit.addEventListener("submit", handleFormSubmit);


// async function handleFormSubmit (e) {
//     e.preventDefault();
//     const form = e.currentTarget;
//     const url = form.action;

//     try{
//         const formData = new FormData(form);

//         const responseData = await postFormDataAsJson ({url, formData});

//         console.log({responseData});
//     } catch (error) {
//         console.error(error);
//     }
// }

// async function postFormDataAsJson ({url, formData}) {
//     const plainFormData = Object.fromEntries(formData.entries());
//     const formDataJsonString = JSON.stringify(plainFormData);

//     const fetchOptions = {
//         method: "POST",
//         headers: {
//             "content-Type": "application/json",
//             Accept: "application/json",
//             'Authorization': `Bearer ${TOKEN}`,
//         },
//         body: formDataJsonString,
//     };

//     const response = await fetch(url, fetchOptions);

//     if (!response.ok) {
//         const errorMessage = await response.text();
//         throw new Error(errorMessage);
//     }

//     return response.json();
// }