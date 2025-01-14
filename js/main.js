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
    var img = `<img class="new-image" src="https://picsum.photos/id/${rand}/${deviceWidth}/700">`;
    //$image_Wrapper.append(img);
    $image_Wrapper.prepend(img);
})

$form_Submit.on('click', function(event){
    if(isValidEmail.test($form_Email.val()) && !isEmailExist(emailArray)){
        var text = $form_Email.val();
        emailArray.push(text);
        console.log(emailArray);
        var option = `<option selected> ${text} </option>`;
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
        event.preventDefault();
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
    var rand = Math.floor(Math.random() * (1081 - 1) + 1);
    var deviceWidth = window.innerWidth - 50;
    var randomImage = `https://picsum.photos/id/${rand}/${deviceWidth}/700`
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
let collectionNo = 0;
let collectionUserNo = 0;
function saveToCollection(){
    const $newImage = $('.new-image');
    let tempImg = $newImage.attr('src');
    //console.log($email_List.val());
    userArray.push([{emailAddress:$email_List.val(), imageSources:tempArray}]);
    console.log(userArray);
    // $collections_Stored.append(`<div class='${collectionNo}-collection collections-container'>
    //                                 <a href='#'>
    //                                     <img src='${tempArray[0]}'>
    //                                     <p class='collection-title'>${$email_List.val()}</p>
    //                                 </a>
    //                             </div>`);
    //console.log(userArray);
    collectionNo += 1;
    $collections_Images.children().remove();
    tempArray = [];
    $collections_Stored.show();
}

function getUserImages(arr){
    $collections_Stored.children().remove();
    for(let key in arr){
        if(typeof arr[key] === "object"){
            for (let nestedKey in arr[key]) {
                //console.log(arr[key][nestedKey]);
                // console.log(arr[key][nestedKey].imageSources.length);
                if('imageSources' in arr[key][nestedKey]){
                    for(let i = 0; i < arr[key][nestedKey].imageSources.length; i++){
                        //console.log(arr[key][nestedKey].imageSources[i]);
                        if(arr[key][0].emailAddress === $email_List.val()){
                            //console.log(arr[key][0].emailAddress);
                            document.querySelector('#collections-title').innerHTML = `Collections - ${arr[key][0].emailAddress}`
                            $collections_Stored.append(`<a href='#' onClick='selectedImage()'>
                                <img id='${i}' class='collection-saved-image' src=${arr[key][nestedKey].imageSources[i]}>
                            </a>`);
                        }
                    }
                }
            }
        } 
        else {
            //console.log(array[key]);
        }
    }

    // for(var i = 0; i < arr.length; i++){
    //     if(arr[i][0].emailAddress === $email_List.val()){
    //         //console.log(arr[i][1]);
    //         //console.log('checked');
    //         for(let j = 0; j < arr[i].length; j++){
    //             console.log('checked');
    //             $collections_Stored.append(`<a href='#' onClick='selectedImage()'>
    //                 <img class='collection-saved-image' src=${arr[0][i].imageSources[j]}>
    //             </a>`);
    //         }
    //         //$collections_Stored.children().remove();
    //         // for(var j = 0; j < arr[i][1].length; j++){
    //         //     //console.log(arr[i][1][j]);
    //         //     //tempArray.push(arr[i][1][j]);
    //         //     //console.log(tempArray);
    //         // }
    //         //$collections_Stored.hide();
    //         //$collections_Images.append(`<img src=${arr[i][1]}>`);
    //         //Display Collection
    //     }
    // }
}

let selectedImageArr = [];
function selectedImage(){
    let $collectionSavedImage = $('.collection-saved-image').attr('src');
    // console.log($collectionSavedImage.attr('src'));
    // selectedImageArr.push($collectionSavedImage.attr('src'));
    // console.log(selectedImageArr);
    console.log($collectionSavedImage);
}

function deleteCollection(arr){
    document.querySelector('#collections-title').innerHTML = 'Collections';
    for(let key in arr){
        if(typeof arr[key] === "object"){
            for (let nestedKey in arr[key]) {
                //console.log(arr[key][0].emailAddress);
                if(arr[key][0].emailAddress === $email_List.val()){
                    //show modal asking if the user wants to delete the collection for user
                    delete arr[key][0].emailAddress;
                    delete arr[key][0].imageSources;
                    // let ETD = emailArray.indexOf($email_List.val());
                    // if(ETD > -1){
                    //     emailArray.splice(ETD, 1);
                    // }
                    // let $email_List_Selected = $('.options :selected');
                    // $email_List_Selected.remove();
                    $collections_Stored.children().remove();
                    console.log(arr[key]);
                }
                else{
                    console.log('mismatch');
                }
                console.log(arr[key]);
              }
        } 
        else {
            //console.log(array[key]);
        }
    }
}

function deleteSelectedImage(arr1, arr2){
    //console.log(arr1);
    for(let key in arr2){
        if(typeof arr2[key] === "object"){
            for (let nestedKey in arr2[key]) {
                //console.log(arr2[key][nestedKey]);
                // console.log(arr[key][nestedKey].imageSources.length);
                for(let i = 0; i < arr2[key][nestedKey].imageSources.length; i++){
                    //console.log(arr2[key][nestedKey].imageSources[i]);

                }
              }
        } 
        else {
            //console.log(array[key]);
        }
    }

    // for(let i = 0; i < arr1.length; i++){
    //     for(let j = 0; j < arr1.length; j++){
    //         if(arr2.imageSources.includes(arr1[i])){
    //             console.log('contains');
    //             $collectionSavedImage.addClass('selected');
    //             $collectionSavedImage.remove('.selected');
    //         }
    //     }
    // }
}

//To Do List
// - Once user presses save image, if the value of the email selector is "default"
//   Display an error message below the save button. !---Completed---!

// - If everything is as it should be, then the save button saves the image to a temporary collection.
//   which is linked to their email address. This should be an array of arrays. !---Completed---!

// - Add in a delete button that allows a user to delete collections/images in a collection.
//   This should be a simple get function that matches an image id with another in the array
//   and then deletes the matching entry. !---in progress---!

 