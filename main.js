// Our data
const employees = [
    {
      id: 1,
      name: "Freddie Mercury",
      department_id: 3,
      computer_id: 4
    },
    {
      id: 2,
      name: "Mona Myrtle",
      department_id: 3,
      computer_id: 1
    },
    {
      id: 3,
      name: "Donnie Darko",
      department_id: 2,
      computer_id: 5
    },
    {
      id: 4,
      name: "Maurice Moss",
      department_id: 1,
      computer_id: 2
    },
    {
      id: 5,
      name: "John Snow",
      department_id: 3,
      computer_id: 7
    },
    {
      id: 6,
      name: "Elaine Benes",
      department_id: 1,
      computer_id: 6
    },
    {
      id: 7,
      name: "Scooby 'Dooby' Doo",
      department_id: 2,
      computer_id: 8
    },
    {
      id: 8,
      name: "Sting",
      department_id: 1,
      computer_id: 9
    },
    {
      id: 9,
      name: "Marvin Gardens",
      department_id: 3,
      computer_id: 10
    }
  ]

const departments = [
    {
      id: 1,
      name: "sales"
    },
    {
      id: 2,
      name: "department of rendundancy"
    },
    {
      id: 3,
      name: "human resources"
    }
  ]

const computers = [
    {
      id: 1,
      name: "Pineapple Dolebook Pro",
      serial_number: 76959389939,
      date_purchased: "03/23/2013"
    },
    {
      id: 2,
      name: "Dull Insipidon",
      serial_number: 38993967789,
      date_purchased: "08/23/2015"
    },
    {
      id: 3,
      name: "Pineapple Dolebook Pro",
      serial_number: 567890345,
      date_purchased: "05/25/2015"
    },
    {
      id: 4,
      name: "Pineapple iDole",
      serial_number: 12345676543,
      date_purchased: "03/23/2013"
    },
    {
      id: 5,
      name: "Alienwhere MegaBrick 2000",
      serial_number: 4675456790,
      date_purchased: "10/31/2016"
    },
    {
      id: 6,
      name: "Pineapple Dolebook Pro",
      serial_number: 5456789939,
      date_purchased: "03/23/2012"
    },
    {
      id: 7,
      name: "Commodore 64",
      serial_number: 5,
      date_purchased: "03/23/1984"
    },
    {
      id: 8,
      name: "Lenohno Stinkpad",
      serial_number: 467898754,
      date_purchased: "03/23/2018"
    },
    {
      id: 9,
      name: "Amazon Firestick",
      serial_number: 876545678900,
      date_purchased: "12/25/2013"
    },
    {
      id: 10,
      name: "Abacus",
      serial_number: null,
      date_purchased: "03/23/1200"
    }
  ]

  // A class that defines an entry in the company directory
  class DirectoryCard {
    constructor(props) {
      this.employee_name = props.name
      this.department = props.department
      this.computer = props.computer
    }

    createListing() {
      return `
      <article class="employee">
        <header class="employee__name">
          <h1>${this.employee_name}</h1>
        </header>
        <section class="employee__department">
          Works in the ${this.department} department
        </section>
        <section class="employee__computer">
          Currently using a ${this.computer.date_purchased.split("/")[2]} ${this.computer.name}
        </section>
      </article>
    `
    }
  }

// The logic for accessing the data and representing it as a collection of cards in the DOM
// employees.forEach( employee => {
//   let employeeData = {
//     name: employee.name,
//     department: departments.find( (dept) => dept.id === employee.department_id).name,
//     computer: computers.find( (computer) => computer.id === employee.computer_id)
//   }

//   let card = new DirectoryCard(employeeData)
//   let div = document.createElement("div")
//   div.innerHTML = card.createListing()
//   document.querySelector("#employee-directory").appendChild(div)
// })









// If data was in our database, instead of defined here in this file, we would have to request it first
// const empQuery = fetch('http://localhost:8088/employees')
//   .then(employeesData => employeesData.json())

// const compQuery = fetch('http://localhost:8088/computers')
//   .then(computersData => computersData.json())

// const deptQuery = fetch('http://localhost:8088/departments')
//   .then(departmentsData => departmentsData.json())

// Promise.all([empQuery, compQuery, deptQuery])
//   .then(dataArray => {
//     const employees = dataArray[0]
//     const computers = dataArray[1]
//     const departments = dataArray[2]
//     employees.forEach(employee => {
//       let employeeData = {
//         name: employee.name,
//         department: departments.find((dept) => dept.id === employee.department_id).name,
//         computer: computers.find((computer) => computer.id === employee.computer_id)
//       }

//       let card = new DirectoryCard(employeeData)
//       let div = document.createElement("div")
//       div.innerHTML = card.createListing()
//       document.querySelector("#employee-directory").appendChild(div)
//     })
//   })



// Now, check this out! Some digging in the json-server docs reveal a method that allows us to " include children resources". What's  that mean? It means you can get all of the employee departments and computers with a single query to the db.
fetch("http://localhost:8088/employees?_expand=department&_expand=computer")
.then( megaData => megaData.json())
.then( (employees) => {
  console.log('employees', employees)

  employees.forEach(employee => {
      let employeeData = {
        name: employee.name,
        department: employee.department.name,
        computer: employee.computer
      }

      let card = new DirectoryCard(employeeData)
      let div = document.createElement("div")
      div.innerHTML = card.createListing()
      document.querySelector("#employee-directory").appendChild(div)
  })
})
