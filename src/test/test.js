/**
 * Created by WFSO on 2015-12-25.
 */

b = $("body").bindSubmit();
b.addFE({
    enctype:"application/json",
    method:"POST",
    action:"/inquiry/create",
    text:['hospital_id','user_id','img_ids','img_ids']
});