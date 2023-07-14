const editFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();
    const postId = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1];
  
    if (title && content) {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
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
  .querySelector('.edit-btn')
  .addEventListener('submit', editFormHandler);