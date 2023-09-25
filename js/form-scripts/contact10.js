$(document).on("ready",function () {
    var form = $("#contact-form10");
    var action = form.attr('action');
    form.validate({
        rules:{
            email: {
                required:true
            },
            subject:{
                required:true
            },
            message:{
                required:true,
                minlength:10
            }
        }
    });
    $('#submit').on("click",function(){
        if(form.valid()){
            $(this).prop('disabled',true);
            $(this).text('loading...');
            $.ajax({
                url:action,
                type:'post',
                data: $('#contact-form10').serialize(),
                success:function(data){
                    if(data){
                        console.log(data);
                        $('#alert').html('<div class="alert alert-success"><b>Success! </b>Your form sumitted successfully</div>');
                        form.trigger('reset');
                    } else {
                        console.log('Verification expired. Check the checkbox again.');
                        $('#alert').html('<div class="alert alert-danger"><b>Warning! </b>Verification expired. Check the checkbox again.</div>');
                    }
                    $('#submit').prop('disabled',false);
                    $('#submit').text('Send Details');
                }
            });
        }
    });
});