import React, { useState } from "react";

const Task = (props) => {
    const [isHovered, setIsHovered] = useState(false)
    return (
        <div className="d-flex justify-content-between border px-5"
            onMouseEnter={() => {
                setIsHovered(true)
            }}

            onMouseLeave={() => {
                setIsHovered(false)
            }}>


            <p className="m-2">
                {props.task.label}
            </p>

            {(isHovered) &&
                <button
                    type="button"
                    className="btn-close m-2 text-pink"
                    aria-label="Close"
                    onClick={() => {
                        props.onRemove()
                    }}
                ></button>
            }
        </div>
    )
}

export default Task;