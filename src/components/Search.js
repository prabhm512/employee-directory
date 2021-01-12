import React, { useEffect, useState } from 'react';
import API from '../utils/API';

const employees = [];

function Search() {

    // Manage state of Search box
    const [search, setSearch] = useState({search: ""});

    // Render table with data in employees array
    const renderTable = (empArray) => {
        // Clear previous innerHTML before rendering new innerHTML
        document.querySelector(".employees").innerHTML = "";

        empArray.forEach(el => {

            // Convert ISO date to DD/MM/YYYY
            let date = new Date(`${el.dob.date}`);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let dt = date.getDate();

            if (dt < 10) {
                dt = '0' + dt;
            }
            if (month < 10) {
                month = '0' + month;
            }

            const newDate = dt+'-' + month + '-'+year;
            // eslint-disable-next-line react-hooks/exhaustive-deps
            let employeeHTML = `
                <tr>
                    <td><img src="${el.picture.medium}"</td>
                    <td>${el.name.first}</td>
                    <td>${el.name.last}</td>
                    <td>${el.phone}</td>
                    <td>${el.email}</td>
                    <td>${newDate}</td>
                </tr>
            `;
            document.querySelector(".employees").innerHTML += employeeHTML;
        });
    }

    const filterEmployees = () => {
        // If employees array is empty, do not run the filter
        if (employees.length !== 0) {
            const searchStr = search.search.toLowerCase();
            const filteredEmpArray = employees[0].filter(el => el.name.first.toLowerCase().includes(searchStr) || el.name.last.toLowerCase().includes(searchStr) || el.email.toLowerCase().includes(searchStr));
            renderTable(filteredEmpArray);
        }
    }

    useEffect(() => {
        // Only fill the employees array if it is empty
        if (employees.length === 0) {
            // Make a GET request to the Random Users API
            API.getRandomEmployees()
                .then(res => employees.push(res.data.results))
                .then(() => {
                    renderTable(employees[0]);
                })
                .catch(err => console.log(err));
        } else {
            filterEmployees();
        }
    })

    return (
        <div className="container-sm">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <form>
                    <input className="form-control" name="searchString" type="search" placeholder="Search (name or email)" aria-label="Search" value={search.search}
                    onChange={event => {
                        // Prevent the location from refreshing
                        event.preventDefault();

                        setSearch({search: event.target.value});
                    }}></input>
                    </form>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )
}

export default Search;