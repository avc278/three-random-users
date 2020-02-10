const acmeRandomApi =
	"https://acme-users-api-rev.herokuapp.com/api/users/random"

const randomPromise1 = fetch(acmeRandomApi).then(response => response.json())
const randomPromise2 = fetch(acmeRandomApi).then(response => response.json())
const randomPromise3 = fetch(acmeRandomApi).then(response => response.json())

const list = document.querySelector(".users")

//two issues with this:
//-one, "p" is not a semantic variable name; it doesn't transparently tell you what it contains (unlike "randomPromise2", which is a great variable name). i know prof did this in the lecture, but not good practice!
//-two, more importantly, you don't actually use "p" anywhere! so no point in actually assigning this promise to a variable, and it confuses the reader who then goes looking to see where "p" is used again.
const p = Promise.all([randomPromise1, randomPromise2, randomPromise3]).then(
	response => {
		renderUsers(response)
	}
)

//looks like this "id=-1" was an earlier try at handling visibility toggling, but you forgot to get rid of it!
const renderUsers = (users, id = -1) => {
	//nice use of index
	const html = users
		.map((user, index) => {
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
		})
		.join("")
	list.innerHTML = html
}

//noice, good work
window.addEventListener("hashchange", () => {
	const id = window.location.hash.slice(1)
	const users = [...document.querySelectorAll(".box")]
	const nums = [...document.querySelectorAll(".num")]
	if (id) {
		users.forEach(user => {
			users[id] !== user
				? user.classList.add("hidden")
				: user.classList.remove("hidden")
		})
		nums.forEach(num => {
			nums[id] === num
				? num.classList.add("selected")
				: num.classList.remove("selected")
		})
	} else {
		users.forEach(user => user.classList.remove("hidden"))
		nums.forEach(num => num.classList.remove("selected"))
	}
})

//great job overall!
