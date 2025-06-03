// Save Task name, description, and sticky note color
const saveTask = (e) => {
    const taskName = document.querySelector('#taskName').value
    const taskDesc = document.querySelector('#taskDesc').value
    const stickyColor = document.querySelector('#stickyColor').value

    // check if all fields are filled
    if (!validateForm(taskName, taskDesc, stickyColor)) {
        return false
    }
    // assign task with the name, description,and color for sticky note
    const task = {
        name: taskName,
        desc: taskDesc,
        color: stickyColor
    }

    // Test if tasks is null
    if (localStorage.getItem("tasks") === null) {
      // Init array
    const tasks = []
      // Add to array
    tasks.push(task)
      // Set to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
      // Get tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks"))
      // Add bookmark to array
    tasks.push(task)
      // Re-set back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    // Clear form
    document.querySelector("#add-task").reset()

    // Re-fetch bookmarks
    fetchTasks()

    // Prevent form from submitting
    e.preventDefault()
}

// assign sticky note color based on dropdown color selected
document.querySelectorAll('.dropdown-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const selectedColor = btn.id;
        console.log("Selected:", selectedColor);
    });
});

// Delete task
const deleteTask = (index) => {
    // Get list of tasks from localStorage and put in array
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    // use splice to remove task using index
    tasks.splice(index, 1)
    // array back to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks))
    // Show remaining notes
    fetchTasks()
}

// set pin colors in array
const pins = ['red', "blue","yellow"]
let pin
// random pin from pins, can repeat colors
pin = Math.floor(Math.random() * pins.length)


// Fetch tasks
const fetchTasks = () => {
    // Get tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem("tasks"))
    const tasksList = document.querySelector("#tasksList")

    // Build output
    tasksList.innerHTML = ""
    // for loop to go through each sticky
    for (let i = 0; i < tasks.length; i++) {
        let name = tasks[i].name
        let desc = tasks[i].desc
        let color = tasks[i].color

        let stickyClass;

        if (color) {
            stickyClass = color;
        } else {
            // use yellow color as default
            stickyClass = "sticky0";
        }

        const pins = ['red', "blue","yellow"]
        let pin
        // random pin from pins
        pin = pins[Math.floor(Math.random() * pins.length)]

        // get random color
        index = 1 
        let lastIndex = -1
        // do while loop to get random index of colors array
        do {
            index = Math.floor(Math.random() * 5)
        } while (lastIndex == index)
        // store last color index to prevent repeat colors
        lastIndex = index

        // html for each sticky note using stored values
        tasksList.innerHTML += `
        <div class="col-12 col-sm-6 col-lg-4 col-xl-3">    
            <div class="note ${stickyClass} pt-3">
                <div class="card-header row w-100 align-items-center">
                    <div class="col-8 d-flex justify-content-end">
                        <img src="./img/${pin}.png" alt="${pin} push pin" class="me-2">
                    </div>
                    <div class="col-4 d-flex justify-content-end">
                        <a onclick="deleteTask(${i})" class="btn text${stickyClass.slice(-1)}" href="#">Remove</a>
                    </div>
                </div>
                <div class="card-body text px-1">
                    <h3 class="card-title mb-2">${name}</h3>
                    <p class="card-text">${desc}</p>
                </div>
            </div>
        </div>`
    }
}

const validateForm = (taskName, taskDesc, stickyColor) => {
    if (!taskName || !taskDesc || !stickyColor) {
        alert("Please fill in the form")
    return false
    }
    return true
}

// Listen for form submit
document.getElementById("add-task").addEventListener("submit", saveTask)

fetchTasks()


