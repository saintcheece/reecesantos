let btnToTop = document.getElementById("btn-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function(){
  let scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  if(window.scrollY >= (scrollableHeight-10)){
    btnToTop.style.bottom = "8.3vw";
  }else{
    btnToTop.style.bottom = "5.5vw";
  }

  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    btnToTop.style.display = "block";
  //} else if((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight){
  //   btnToTop.style.bottom = "8.3vw";
  }else {
    btnToTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function toTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}