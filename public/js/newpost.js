const newpostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#new-title').value.trim();
    const content = document.querySelector('#new-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
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
  .querySelector('.new-form')
  .addEventListener('submit', newpostFormHandler);