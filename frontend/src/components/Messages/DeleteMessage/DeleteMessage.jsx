import React from "react";


const DeleteMessage = ({ onDelete }) => {
      const handleClick = (event) => {
       event.stopPropagation();
       onDelete(); 
      }        

  return (
     <div onClick={handleClick}>
        
        </div>
  )
}

export default DeleteMessage