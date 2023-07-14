const deleteFormHandler = async (event) => {
    event.preventDefault();
  
    const postId = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1];
  
    if (title && content) {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
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
  .querySelector('.dlt-btn')
  .addEventListener('submit', editFormHandler);