const tokenInput = document.querySelector('#csrf_token');
const token = tokenInput.value;

const button = document.querySelector('#create-user-button');
button.addEventListener('click', function(event) {
    event.preventDefault();

    const form = document.querySelector('#create-user-form');
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch (USER_CREATE_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': token,
        },
        body: JSON.stringify(data),
    }).then((res) => res.json())
        .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
});