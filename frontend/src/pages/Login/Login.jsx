import React from 'react'
import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div>
            <Navbar />

            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border-rounded bg-white px-7 py-10'>
                    <form onSubmit={() => { }}>
                        <h4 className='text-2xl mb-7'>Login</h4>

                        <input type="text" placeholder='Email' className='input-box' />

                        <button type='submit' className='btn-primary'>
                            Login
                        </button>

                        <p className='text-sm text-center mt-4'>
                            Not registered yet?{' '}
                            <Link to='/signup' className="font-medium text-primary underline">
                                Create an Account
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

        </div >
    )
}

export default Login