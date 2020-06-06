

let createList=function(){      
    let listform=$(`#new-entry`);
    listform.submit(function(e)
    {
        e.preventDefault();
        console.log("we are in the js file")
        $.ajax({
            type:"post",
            url:"/users/create",
            data:listform.serialize(),
            success:function(data)
            {
                console.log(data.data.newList,"it you want to show the data");
                let newlist=newDOMList(data.data.newlist);
                $(".list-container").append(newlist);
                console.log(checkboxs,taskNames,taskDates);
                swal({
                    title: "Added Successfully!",
                    text: "The new task is added!",
                    icon: "success",
                });
            },
            error:function(err)
            {
                console.log("error in creating a list using ajax ",err);
            }
        })
    })
}
createList();
let newDOMList=function(list)
{
    return $(`<li id="list-${list._id}" class="onelist" >

    <input type="checkbox" name="${list._id}" class="markLine">

    <div class="list-details">
        <span> ${list.description } </span>
        <p class="entry-date" > ${list.date } </p>
    </div>

    <div class="list-category">
        <div style="margin-top: 8px;"> ${list.cat }</div>
    </div>

</li>`)
}

let deleteLists=function()
{
    let deleteListForm=$("#delete-list-form");
    deleteListForm.submit(function(e)
    {
        e.preventDefault();
        $.ajax({
            type:"get",
            url:"/users/deleteEntry",
            data:deleteListForm.serialize(),
            success:function(data)
            {
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover these tasks!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  })
                  .then((willDelete) => {
                    if (willDelete) {
                        let delItems=data.data.deletedItems;
                        delItems.forEach(function(item)
                        {
                            $(`#list-${item._id}`).remove();
                        });
                        swal("Your tasks has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your tasks are safe!");
                    }
                  });
            },
            error:function(err)
            {
                console.log("error in deleting task using ajax ",err);
            }
        })
    });
    
}
deleteLists();



