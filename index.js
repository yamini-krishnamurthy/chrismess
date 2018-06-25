const changeHeading = function(event) {
  document.querySelector('h1').textContent = document.getElementById('headingchange').value
  event.preventDefault();
  document.getElementById('headingchange').value = '';
}

