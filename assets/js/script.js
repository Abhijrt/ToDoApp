// creating the color object
let color = {
    'Personal' : {'background':'aquamarine'},
    'School' : {'background':'blue'},
    'Work' : {'background':'purple'},
    'Other' : {'background':'navy'},
    'personal' : {'background':'aquamarine'},
    'school' : {'background':'blue'},
    'work' : {'background':'purple'},
    'other' : {'background':'navy'},
}

// change color function of the category
function changeColor(){
    let mainContainer = document.querySelectorAll('.list-category');
    let categories = document.querySelectorAll('.list-category .category');
    for(let i=0;i<categories.length;i++){
        let currentCategory = categories[i].textContent;
        mainContainer[i].style.backgroundColor = color[currentCategory]['background'];
    }
}
changeColor();

// line through function when we click on the checkbox
function markLine(){
    var checkboxes = $('.onelist input');
    var description = $('.list-details span');
    var date = $('.list-details p');
    for(let i=0;i<checkboxes.length;i++){
        console.log("#######IN checkbox function");
        checkboxes[i].addEventListener('click',function(){
            if(checkboxes[i].checked){
                description[i].style.textDecoration = "line-through";
                date[i].style.textDecoration = "line-through";
            }else{
                description[i].style.textDecoration = "none";
                date[i].style.textDecoration = "none";
            }
        });
    }
}
markLine();

// function when we create a new entry 
let createList=function(){      
    console.log("###########IN create Function");
    let listform=$(`#new-entry`);
    listform.submit(function(e)
    {
        console.log("###########IN create Function");
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
                markLine();
                console.log("hii abhay you are in create of ajax");
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

// create a dom for new list
let newDOMList=function(list)
{
    let category = list.cat;
    return $(`<li id="list-${list._id}" class="onelist" >

    <input type="checkbox" name="${list._id}" class="markLine">

    <div class="list-details">
        <span> ${list.description } </span>
        <p class="entry-date" > ${list.date } </p>
    </div>

    <div class="list-category" style="background-color:${color[category]['background']};>
        <div style="margin-top:8px;" class="category" > ${list.cat }</div>
    </div>

</li>`)
}

// delete function when we delete a element 
let deleteLists=function(){
    console.log("###########IN delete Function");
    let deleteListForm=$("#delete-list-form");
    deleteListForm.submit(function(e)
    {
        console.log("###########IN delete Function");
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






