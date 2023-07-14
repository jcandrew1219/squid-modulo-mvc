const commentFormHandler = async (event) => {
    event.preventDefault();
  
const comment = document.querySelector('#comment-input').value.trim();
    const postId = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1];
  
    if (comment && postId) {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'POST',
        body: JSON.stringify({ comment, postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('.comment-btn')
  .addEventListener('submit', editFormHandler);