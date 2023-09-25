
$(document).ready(function () {
    var form = $("#job-apply2-form");
    var action = form.attr('action');
    form.validate({
        rules:{
            name: { required:true },
            email:{ required:true, email:true },
            language:{ required:true },
            message:{ required:true, minlength:10 },
            // attachment:{ required:true }
        },
        messages:{
            name: { required:"Name field is required" },
            email:{ required:"Email field is required", email: "Please enter a valid email address" },
            language:{ required:"Language field is required" },
            message:{ required:"Message field is required", minlength: "Message must be atleast 10 characters long" },
            // attachment:{
            //     required:"Please select an attachment",                  
            //     extension:"Please select valid file format jpg, png, gif, zip"
            // },
        }
    });

    $('#job-apply2-form').submit(function(e){
        e.preventDefault();
        if(form.valid()){
            var fd = new FormData(this);
            $('#submit').prop('disabled',true);
            $('#submit').text('Sending...');
            $.ajax({
                url:action,
                type:'post',
                cache: false,
                contentType: false,
                processData: false,
                data: fd,
                success:function(data){
                    if(data.status == 'success'){
                        $('#alert').html('<div class="alert alert-success"><b>Success! </b>'+data.message+'</div>');
                        $('#submit').prop('disabled',false);
                        $('#submit').text('Send Details');
                        form.trigger('reset');
                    } else if(data.status == 'error'){
                        $.each(data.errors, function( index, value ) {
                            $('#file-error').html('');
                            $('#file-error').append(value+'<br/>');
                        });
                        $('#submit').prop('disabled',false);
                        $('#submit').text('Send Details');
                    } else if(data.status == 'expire'){
                        $('#alert').html('<div class="alert alert-danger"><b>Warning! </b>'+data.message+'</div>');
                        form.trigger('reset');
                        $('#submit').prop('disabled',false);
                        $('#submit').text('Send Details');
                    }
                }
            });
        }
    });
});
function recaptcha_callback(){
    $('#submit').prop("disabled", false);
}