/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import API from '../utils/API';

function EmpTable() {
    const employees = [];
    // const [empState, setEmpState] = useState(state);
    
    useEffect(() => {
        // Make a GET request to the Random Users API
        API.getRandomEmployees()
            .then(res => employees.push(res.data.results))
            .then(() => {
                employees[0].forEach(el => {

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
                            <td>${el.name.first} ${el.name.last}</td>
                            <td>${el.phone}</td>
                            <td>${el.email}</td>
                            <td>${newDate}</td>
                        </tr>
                    `;
                    document.querySelector(".employees").innerHTML += employeeHTML;
                })
            })
            .catch(err => console.log(err));
    });
    
    return (
        <div className="container-sm">
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
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
    )
}        

export default EmpTable;