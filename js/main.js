const $form_Email = $('#email');
const $form_Submit = $('.btn-submit');
const $email_List = $('.options');
const $image_Wrapper = $('.image-wrapper');
const $collections_Images = $('.collections-images');
const $collections_Stored = $('.collections-stored');
const input_Email = document.querySelector('input[name="email"]');
let emailArray = [];
let isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

$(document).ready(function(){
    var rand = Math.floor(Math.random() * 100);
    var deviceWidth = window.innerWidth - 50;
    console.log(rand);
    var img = `<img class="new-image" src="https://picsum.photos/id/${rand}/${deviceWidth}/650">`;
    //$image_Wrapper.append(img);
    $image_Wrapper.prepend(img);
})

$form_Submit.on('click', function(event){
    if(isValidEmail.test($form_Email.val()) && !isEmailExist(emailArray)){
        var text = $form_Email.val();
        emailArray.push(text);
        console.log(emailArray);
        var option = `<option> ${text} </option>`;
        $form_Email.val('');
        $email_List.append(option);
        $form_Email.attr('oninvalid', 'this.setCustomValidity("Email Has Been Uploaded")');
        $form_Email.attr('oninput', ' ');
        //console.log(text);
        //event.preventDefault();
    }
    else if(isValidEmail.test($form_Email.val()) && isEmailExist){
        //alert('You have entered an existing email, please select from the list below.');
        $form_Email.attr('oninvalid', 'this.setCustomValidity("Email Already Exists")');
        $form_Email.attr('oninput', ' ');
        //event.preventDefault();
    }
    else{
        //console.log('False');
        // var text = $form_Email.val();
        // var option = `<option> ${text} </option>`;
        // $email_List.append(option);
        // console.log(text);
        //alert('Incorrect Email has been entered. Please enter a valid email address');
        $form_Email.attr('oninvalid', 'this.setCustomValidity("Email is Invalid")');
        $form_Email.attr('oninput', ' ');
        //event.preventDefault();
    }
})

function isEmailExist(email){
    if(email.includes($form_Email.val())){
        return true;
    }
    else{
        return false;
    }
}

function generateNewImage(){
    const $newImage = $('.new-image');
    var rand = Math.floor(Math.random() * (1081 - 100) + 100);
    var deviceWidth = window.innerWidth - 50;
    var randomImage = `https://picsum.photos/id/${rand}/${deviceWidth}/650`
    $newImage.attr('src', randomImage);
}

let tempArray=[];
function saveImage(){
    if($email_List.val() === 'default'){
        //console.log('Default Detected');
        $('.error').hide();
        $image_Wrapper.append(`<p class="error">Error: You haven't entered a valid email, please enter an email to save images to a collection</p>`)
    }
    else{
        $('.error').hide();
        const $newImage = $('.new-image');
        let tempImg = $newImage.attr('src');
        //console.log(tempImg);
        tempArray.push(tempImg);
        //console.log(tempArray);
        $collections_Images.append(`<img src='${tempImg}'>`);
        generateNewImage();
    }
}

let userArray = [];
function saveToCollection(){
    const $newImage = $('.new-image');
    let tempImg = $newImage.attr('src');

    console.log($email_List.val());
    userArray.push([$email_List.val(), tempArray]);
    $collections_Stored.append(`<div class='${userArray[0]}-collection collections-container'>
                                    <a href='#'>
                                        <img src='${tempArray[0]}'>
                                        <p>${$email_List.val()}</p>
                                    </a>
                                </div>`);
    console.log(userArray);
    $collections_Images.children().remove();
    tempArray = [];
}

//To Do List
// - Once user presses save image, if the value of the email selector is "default"
//   Display an error message below the save button. !---Completed---!

// - If everything is as it should be, then the save button saves the image to a temporary collection.
//   which is linked to their email address. This should be an array of arrays.

// - Add in a delete button that allows a user to delete collections/images in a collection.
//   This should be a simple get function that matches an image id with another in the array
//   and then deletes the matching entry.

 