const deleteHandler = async (event) => {
    event.preventDefault();
  
    const postId = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1];
  
    if (postId) {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

  document
  .querySelector('#dlt-btn')
  .addEventListener('click', deleteHandler);