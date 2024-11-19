import React from 'react'

export default function Item({text, description, checked, toggleChecked, remove, update}) {
    console.log("Item props:", { text, description });
    return (
        <div className="item">
            <input
        type="checkbox"
        checked={checked} // Bind checked state
        onChange={toggleChecked} // Handle toggle
        className="item-checkbox"
      />
        <div className="item-content">
            <div className="item-text">{text}</div>
            <div className="item-description">{description}</div>
            <div className="icons">
                <i className="ri-pencil-fill" onClick={update}></i>
                <i className="ri-delete-bin-7-fill" onClick={remove}></i>
            </div>
            </div>
        </div>
    )
}
