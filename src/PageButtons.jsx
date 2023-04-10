import React from "react";

const PageButtons = ({ page, handleClick }) => {

    return (
        <div className='page-buttons'>
            <h1 onClick={() => handleClick(-1)}>-</h1>
            <h1>{page}</h1>
            <h1 onClick={() => handleClick(1)}>+</h1>
        </div>
    )
}

export default PageButtons;