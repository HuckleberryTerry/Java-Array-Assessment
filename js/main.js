$form_Email = $('#email');
$form_Submit = $('.btn-submit');
$email_List = $('.options');
$image_Wrapper = $('.image-wrapper');
let isValidEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
$(document).ready(function(){
    var rand = Math.floor(Math.random() * 100);
    console.log(rand);
    var img = `<img src="https://picsum.photos/id/${rand}/450/450">`;
    $image_Wrapper.append(img);
})

$form_Submit.on('click', function(event){
    if(isValidEmail.test($form_Email.val())){
        var text = $form_Email.val();
        var option = `<option> ${text} </option>`;
        $email_List.append(option);
        console.log(text);
        event.preventDefault();
    }
    else{
        console.log('False');
        // var text = $form_Email.val();
        // var option = `<option> ${text} </option>`;
        // $email_List.append(option);
        // console.log(text);
        event.preventDefault();
    }
})