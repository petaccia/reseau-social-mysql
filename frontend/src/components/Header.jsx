import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faCar } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  return (
    <div className='header-container'>
      <h1>Je suis le header</h1>
      <FontAwesomeIcon icon={faCar} />
    </div>
  )
}

export default Header