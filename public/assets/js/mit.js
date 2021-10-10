var ajax_url = 'http://localhost/mit/';
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
  $(document).on("change", '.secure_file', function () {
    var file = $(this);
    var form_action = file.closest("form").attr('action');
    console.log(form_action);
    var formData2 = new FormData();
    formData2.append(name, file[0].files[0]);
    $("#upload-popup").show();
    var ajax = new XMLHttpRequest();
    ajax.extraInfo = file;
    ajax.extraInfo2 = new Date().getTime();
    ajax.extraInfo3 = name;
    ajax.upload.addEventListener("progress", progressHandler, false);
    ajax.addEventListener(
      "load",
      function completeHandler(event) {
        $("#upload-popup").hide(); //hide popup
        var response = event.target.responseText;
        response = JSON.parse(response);
        $(event.target.extraInfo).attr("data-file", response.file); //set data with filename
        //convert file with delete link
        $(event.target.extraInfo).wrap(
          '<span id="' + event.target.extraInfo2 + '"></span>'
        );
        $(
          '<input type="hidden" name="' +
            event.target.extraInfo3 +
            '" value="' +
            response.file +
            '" readonly />'
        ).appendTo($("#" + event.target.extraInfo2));
        $(
          '<a href="javascript:void(0)" class="remove-file"><i class="fas fa-times"></i></a>'
        ).appendTo($("#" + event.target.extraInfo2));
        $(event.target.extraInfo).hide();
      },
      false
    );
    ajax.addEventListener("error", errorHandler, false);
    ajax.addEventListener("abort", abortHandler, false);
    ajax.open("POST", form_action);
    ajax.send(formData2);    
  });
});
function _(el) {
  return document.getElementById(el);
}
function progressHandler(event) {
  _("loaded_n_total").innerHTML =
    "Uploaded " + event.loaded + " bytes of " + event.total;
  var percent = (event.loaded / event.total) * 100;
  //console.log(percent);
  _("progressBar").value = Math.round(percent);
  _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
}
/*function completeHandler(event){
	//_("status").innerHTML = event.target.responseText;
	//_("progressBar").value = 0;
	$('#upload-popup').hide();
	//console.log(event);
}*/
function errorHandler(event) {
  _("status").innerHTML = "Upload Failed";
}
function abortHandler(event) {
  _("status").innerHTML = "Upload Aborted";
}