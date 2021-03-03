import Register from './Register'
import SignIn from './SignIn'
import '../styles/signIn.css'



const RegisterUser = () => {

    return (
        <div className="containerRegisterUser" >
            <SignIn/>
            <Register/>
        </div>
    )
}

export default RegisterUser