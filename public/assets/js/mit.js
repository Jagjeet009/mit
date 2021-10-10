/*if (typeof jQuery != 'undefined') {
console.log("jQuery library is loaded!");
}
else{
console.log("jQuery library is not found!");
}*/
$(function() {
  $("form[name='createForm']").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      },
      cpassword: {
        required: true,
        minlength: 5,
        equalTo: '[name="password"]'
      }      
    },
    messages: {
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },
      cpassword: {
        required: "Please provide a confirm password same as password",
        minlength: "Your password must be at least 5 characters long"
      },      
      email: "Please enter a valid email address"
    },
    normalizer: function(value) {
      return $.trim(value);
    },
    submitHandler: function(form) {
      form.submit();
    }
  });
$("form[name='loginForm']").validate({
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 5
      }    
    },
    messages: {
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 5 characters long"
      },     
      email: "Please enter a valid email address"
    },
    normalizer: function(value) {
      return $.trim(value);
    },
    submitHandler: function(form) {
      form.submit();
    }
  });  
});