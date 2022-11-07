import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import '../styles/css/index.css';

function SignIn(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = () => {};
  const signInToggler = () => setOpenSignIn((p) => !p);
  return props.trigger ? (
    <div className={`signIn ${openSignIn ? `signIn--open` : {}}`}>
      <button className='signIn__toggler' onClick={signInToggler}>
        <AiOutlineClose />
      </button>
    </div>
  ) : (
    ''
  );
}

export default SignIn;
