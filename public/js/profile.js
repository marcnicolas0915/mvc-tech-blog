// button to reveal the form for a new post
const postNewRender = async (event) => {
    document
      .querySelector('.new-post-render')
      .classList.toggle("invisible");
    document
      .querySelector('.new-post-form')
      .classList.remove("invisible");
  };

    // adds a new post from new post form data
const newPostHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

  // deletes a post specified by the button's parent
const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }};

// ==========  set up event listeners =========================

// show new post form
document
  .querySelector('.new-post-render')
  .addEventListener('click', postNewRender);

// submit new post form
document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostHandler);


// if there are posts, look for a delete button and delete the post 
if(document.querySelector('.post-delete')){
  let deleteBtn = document.querySelectorAll('.post-delete');

  for(i = 0; i < deleteBtn.length; i++)
      deleteBtn[i].addEventListener('click', delButtonHandler);
};