/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import API from '../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaDown } from '@fortawesome/free-solid-svg-icons';

let employees = [];
let filteredEmpArray = [];

function EmpTable() {

    // Get employee names from local storage so new list of employees is not rendered on every page reload
    const init = () => {
        let storedEmployees = JSON.parse(localStorage.getItem("employeeList"));

        // Only fill the employees array if it is empty
        if (storedEmployees !== null) {
            employees = storedEmployees;
            renderTable(employees[0]); 
        } else {
            // Make a GET request to the Random Users API
            API.getRandomEmployees()
                .then(res => {
                    employees.push(res.data.results);
                    storeEmployees();
                })
                .then(() => {
                    renderTable(employees[0]);
                })
                .catch(err => console.log(err));
        }
    }

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
            filteredEmpArray = employees[0].filter(el => el.name.first.toLowerCase().includes(searchStr) || el.name.last.toLowerCase().includes(searchStr) || el.email.toLowerCase().includes(searchStr));
            renderTable(filteredEmpArray);
        }
    }

    // Sort employees in alphabetical order
    const sortEmployees = (arrIndexName) => {
        
        let sortedEmpArray = [];
        let nameA, nameB;


        if (filteredEmpArray.length !== 0 ) {
            sortedEmpArray = filteredEmpArray.sort((a, b) => {
                // To reuse function for sorting by first and last name
                if (arrIndexName === 'first') {
                    nameA = a.name.first.toLowerCase();
                    nameB = b.name.first.toLowerCase();
                } else {
                    nameA = a.name.last.toLowerCase();
                    nameB = b.name.last.toLowerCase();
                }

                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            renderTable(sortedEmpArray);
        } else {
            sortedEmpArray = employees[0].sort((a, b) => {
                if (arrIndexName === 'first') {
                    nameA = a.name.first.toLowerCase();
                    nameB = b.name.first.toLowerCase();
                } else {
                    nameA = a.name.last.toLowerCase();
                    nameB = b.name.last.toLowerCase();
                }

                if (nameA < nameB) {
                    return -1;
                } else if (nameA > nameB) {
                    return 1;
                } else {
                    return 0;
                }
            });
            renderTable(sortedEmpArray);
        }
    }

    // Store all employees in localstorage
    const storeEmployees = () => {
        localStorage.setItem("employeeList", JSON.stringify(employees));
    }

    useEffect(() => {
        if (employees.length === 0) {
            init();
        } else {
            filterEmployees();
        }
    });

    return (
        <section>
        <div className="container-sm searchForm">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <form>
                    <input className="form-control searchInput" name="searchString" type="search" placeholder="Search (name or email)" aria-label="Search" value={search.search}
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
        <div className="container-sm">
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">First Name <span className="sort-alpha-down"><FontAwesomeIcon icon={faSortAlphaDown} onClick={event => {
                                    event.preventDefault();
                                    sortEmployees('first');
                                }}/></span></th>
                                <th scope="col">Last Name <span className="sort-alpha-down"><FontAwesomeIcon icon={faSortAlphaDown} onClick={event => {
                                    event.preventDefault();
                                    sortEmployees('last');
                                }}/></span></th>
                                <th scope="col">Phone</th>
                                <th scope="col">Email</th>
                                <th scope="col">DOB</th>
                            </tr>
                        </thead>
                        <tbody className="employees"></tbody>
                    </table>
                </div>
            </div>
        </div>
        </section>
    )
}        

export default EmpTable;