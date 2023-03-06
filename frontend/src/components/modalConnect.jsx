import React from 'react'
import AuthForm from './Auth/AuthForm'
import ErrorModalForm from './Auth/modalError'

const ModalConnect = () => {
  return (
    <section className='modal-connexion'>
              <AuthForm />
              <div>
                <ErrorModalForm />;
              </div>
             
    </section>
    
  )
}

export default ModalConnect