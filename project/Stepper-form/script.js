// Setting the lock status = 1 denoting the default lock state of the stepper.
// I've used localStorage so that the completed steps are not lost on page refresh.
if(localStorage.length == 0) localStorage.setItem('unlock', 1);

let elements = document.getElementsByClassName("step-header"); // the steps
let len = elements.length;  // total number of steps.

// Adding a click event Listener on all the elements.
for (var i = 0; i < len ; i++) {
    elements[i].addEventListener('click', function(){
      let step_container = this.nextElementSibling; // container of "this" step.
      let temp = this.parentElement.classList[1];
      let step_no = parseInt(temp[5]);  // fetching the step number of "this" step.
      let unlock_state = localStorage.getItem('unlock');  // fetch the lock state.
      if(unlock_state >= step_no){  // You can open the steps equal or prior to current lock state.
        for(let j = 0 ; j < len ; j++ ){ // close all opened step containers.
          elements[j].nextElementSibling.classList.remove("open");
          elements[j].children[1].classList.remove("active");
        }
        step_container.classList.toggle("open");  // open this step.
        this.children[1].classList.toggle("active");
      }
    });
}
// this function fetched the data from all the text boxes in the stepper and stores them appropriatly.
function fetchVal(event)
{
  if(event.key === 'Enter') // The fetching process begins after you press enter.
  {
    event.preventDefault();
    let email_tb = document.getElementsByName("email");
    let pass_tb = document.getElementsByName("password");
    if(email_tb[0].value != "") // if the email slot is nonempty save it.
    {
      storeData(email_tb[0].value,1); // function call to store data.
      localStorage.setItem('unlock', 2);  // update unlock 2nd step.

      // Some UI code.
      elements[0].children[0].removeAttribute("style");
      elements[0].children[0].classList.add("completed");
      elements[0].children[0].innerText = "";
      elements[0].nextElementSibling.classList.remove("open");
      elements[1].nextElementSibling.classList.toggle("open");
    }
    if(pass_tb[0].value != "")  // you get the idea.
    {
        storeData(pass_tb[0].value,2);
        localStorage.setItem('unlock', 3);

        elements[1].children[0].classList.add("completed");
        elements[1].children[0].innerText = "";
        elements[1].nextElementSibling.classList.remove("open");
        elements[2].nextElementSibling.classList.toggle("open");
    }
  }
}
// data = data.
// state = what data is this.
function storeData(data, state)
{
  if(state == 1) localStorage.setItem('email', data);
  if(state == 2) localStorage.setItem('password', data);
}
function submitForm(event)
{
  alert(localStorage.getItem('email'));
  alert(localStorage.getItem('password'));

  // clear local storage.
  localStorage.removeItem('unlock');
  localStorage.removeItem('email');
  localStorage.removeItem('password');
  location.reload(); 
}
