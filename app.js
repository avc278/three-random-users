const acmeRandomApi = 'https://acme-users-api-rev.herokuapp.com/api/users/random';

const randomPromise1 = fetch(acmeRandomApi).then( response => response.json());
const randomPromise2 = fetch(acmeRandomApi).then( response => response.json());
const randomPromise3 = fetch(acmeRandomApi).then( response => response.json());

const list = document.querySelector('.users');

const p = Promise.all([ randomPromise1, randomPromise2, randomPromise3 ])
    .then( response => {
        renderUsers(response);
    })

const renderUsers = (users, id=-1) => {
    const html = users.map( (user, index) => {
        return `
            <li>
                <div class="num">
                    <a href='#${index}'>${index + 1}</a>
                </div>
                <div class="box">
                    <p>${user.fullName}</p>
                    <p>${user.email}</p>
                    <img src=${user.avatar} alt="${user.firstName}'s avatar">
                </div>
            </li>
            `
    }).join('')
    list.innerHTML = html;
}

window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1);
    const users = [...document.querySelectorAll('.box')];
    const nums = [...document.querySelectorAll('.num')];
    if (id) {
        users.forEach(user => {
            users[id] !== user ? user.classList.add('hidden') : user.classList.remove('hidden');
        })
        nums.forEach(num => {
            nums[id] === num ? num.classList.add('selected') : num.classList.remove('selected');
        })
    }
    else {
        users.forEach(user => user.classList.remove('hidden'));
        nums.forEach(num => num.classList.remove('selected'));
    }
})
