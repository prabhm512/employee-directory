import React from 'react';

function Search() {
    return (
        <div className="container-sm">
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <form>
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search"></input>
                    </form>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    )
}

export default Search;