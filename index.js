let id = 1;
const titleInput = document.getElementById('titleInput');
const bodyText = document.getElementById('bodyText');
const selectItem = document.getElementById('selectItem');
const postsCont = document.getElementById('postsCont');
const notFound = document.createElement('h2');
const loadingContent = document.createElement('h2');
const submitBtn = document.getElementById('submitBtn');
let edittingPostId = null;

let postsList = []

function handleEdit(e) {
  const [tag, postId] = e.target.id.split("_")
  const found = postsList.find(post => post.id == postId);
  titleInput.value = found.title;
  bodyText.value = found.body;
  submitBtn.innerText = "Save changes";
  submitBtn.classList.add("edit");
  edittingPostId = postId;
}

function createPost(post) {
  const cont = document.createElement('div');
  const title = document.createElement('h2');
  const body = document.createElement('p');
  const buttonsCont = document.createElement('div');
  body.innerText = post.body;
  title.innerText = post.title;
  cont.id = post.id;
  const editButton = document.createElement('button');
  editButton.innerText = "Edit";
  editButton.classList.add('btn');
  editButton.style.background = 'red';
  editButton.addEventListener('click', handleEdit);
  editButton.id = `btn_${post.id}`
  buttonsCont.appendChild(editButton)
  cont.appendChild(title);
  cont.appendChild(body);
  cont.appendChild(buttonsCont);
  postsCont.appendChild(cont)
}

function submitForm() {
  const post = {
    title: titleInput.value,
    body: bodyText.value,
  }
  if (edittingPostId) {
    const cont = document.getElementById(edittingPostId);
    const body = cont.querySelector('p');
    const title = cont.querySelector('h2');
    body.innerText = post.body;
    title.innerText = post.title
  } else {
    post.id = postsList[postsList.length - 1].id + 1;
    postsList.push(post);
    createPost(post);
  }

}

function loadPosts() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts => {
      postsList = posts;
      posts.map(post => createPost(post))
    }) 
}

loadPosts()