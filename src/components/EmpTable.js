import React, { useEffect } from 'react';
import API from '../utils/API';

function EmpTable() {
    // const empState = [];

    // const [state, setState] = useState(empState);

    // setState([...state]);

    useEffect(() => {
        // Make a GET request to the Random Users API
        API.getRandomEmployees()
            .then(res => console.log(res))
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
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}        

export default EmpTable;