let id = 1;
const titleInput = document.getElementById('titleInput');
const bodyText = document.getElementById('bodyText');
const selectItem = document.getElementById('selectItem');
const postsCont = document.getElementById('postsCont');
const notFound = document.createElement('h2');
let posts = []
if (localStorage.getItem('posts')) {
  posts = JSON.parse(localStorage.getItem('posts'));
}
if (posts.length == 0) {
  notFound.innerText = "You have no posts, add one...";
  notFound.classList.add('center')
  postsCont.appendChild(notFound)
}
function createPost(post) {
  const cont = document.createElement('div');
  const title = document.createElement('h2');
  const tag = document.createElement('span');
  const body = document.createElement('p');
  body.innerText = post.body;
  title.innerText = post.title;
  tag.innerText = post.category;
  cont.id = post.id;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete";

  cont.appendChild(title);
  cont.appendChild(body);
  cont.appendChild(tag);
  cont.appendChild(deleteBtn);
  postsCont.appendChild(cont)
}

posts.map(post => {
  id = +post.id + 1;
  createPost(post);
})

function submitForm() {
  const post = {
    id: id,
    title: titleInput.value,
    body: bodyText.value,
    category: selectItem.value
  }
  id++;
  posts.push(post);
  localStorage.setItem('posts', JSON.stringify(posts));
  createPost(post);

}