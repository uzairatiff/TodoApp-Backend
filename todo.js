
//create toodo
let todoInput = document.getElementById("todoInput")
let listingParent = document.getElementById("listingParent")

const createTodo = async () => {
    console.log(todoInput.value);
    
    const body = {
      todo: todoInput.value
    };

    try {
      const res = await fetch("http://localhost:5000/createTodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
  
      const data = await res.json();
      console.log(data);

      getTodos()
      
    } catch (error) {
      console.log("Fetch error:", error.message);
    }
  };

  const getTodos = async () => { 
    try {
      const responseData = await fetch("http://localhost:5000/getTodos")
        .then(res => res.json())
        .catch(err => console.log(err.message));
      
      console.log(responseData);

      listingParent.innerHTML = ""
  
      // Use the correct data array from responseData
      const todoData = responseData.data;
  
      todoData.map((data) => {
        listingParent.innerHTML += `
          <span class="todo-text">${data.todo}</span>
          <div class="todo-actions">
            <button id="${data._id}" onclick="editTodo(this)" class="edit-btn">Edit</button>
            <button id="${data._id}" onclick="deleteTodo(this)" class="delete-btn">Delete</button>
          </div></br>
        `;
      });
  
    } catch (error) {
      console.log(error.message);
    }
  };


  const editTodo =async (ele)=>{
    try {
      const todoId = ele.id
     const editValue = prompt("enter Edit text")
     if (editValue == "") {
      alert("you should write something")
     }

     console.log(ele);

     const editObj = {
      todo : editValue
     }
     
     const updateResponse = await fetch(`http://localhost:5000/updateTodo/${todoId}`,
      {
        method : "put",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(editObj)
      }
     )  
     
     .then(res=>res.json())
     .catch(err=>console.log(err.message)
     )
     console.log(updateResponse);
     
     getTodos()

    } catch (error) {
      console.log(error.message);
      
    }
  }



  const deleteTodo = async (ele) => {
    try {
      console.log(ele.id);
  
      const dltId = {
        id: ele.id
      };
  
      const dltResponse = await fetch(`http://localhost:5000/deleteTodo/${ele.id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(dltId)
      })
      .then(res => res.json())
      .catch(err => console.log(err.message));
  
      console.log(dltResponse);
  
    } catch (error) {
      console.log(error);
    }
  };
  









window.createTodo = createTodo
window.deleteTodo = deleteTodo
window.editTodo = editTodo
window.addEventListener("load" , getTodos)