/* eslint-disable no-undef */
import React from 'react';

function EmpTable() {

    return (
        <div className="container-sm">
            <div className="row">
                <div className="col-sm-12">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Image</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
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