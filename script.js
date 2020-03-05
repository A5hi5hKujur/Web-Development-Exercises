var nav_elements = document.getElementsByClassName('nav');
for(let i=0; i<nav_elements.length; i++)
{
  nav_elements[i].addEventListener("click",function(){
    for(let j=0; j<nav_elements.length; j++)
    {
      nav_elements[j].classList.remove('active');
    }
    this.classList.toggle('active');
    // switch the contents
    let id = this.attributes[0].value;
    let thumbnails = document.getElementsByTagName('section')[0].children;
    console.log(thumbnails);
    for(let j=0; j<thumbnails.length; j++){
      thumbnails[j].classList.remove('hidden');
      let class_att = thumbnails[j].attributes[1].value.split(" ");
      if(class_att[0] != id && id != "nav-all"){
        thumbnails[j].classList.add('hidden');
      }
    }
  });
}
