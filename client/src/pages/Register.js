import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert } from '../components';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  console.log('M1', values.isMember)
  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    console.log('M2', values.isMember)
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    console.log('M3', values.isMember)

    if (!email || !password || (!isMember && !name)) {
      console.log('M4', values.isMember)
      displayAlert();
      return;
    }

    const currentUser = { name, email, password };

    if (isMember) {
      console.log('Ήδη μέλος.');
      console.log('M5', values.isMember)
      loginUser({email, password});
    } else {
      console.log('Στοιχεία (Values): ', values);
      registerUser({currentUser});
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Είσοδος' : 'Εγγραφή'}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
            labelText='Όνομα'
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          labelText='Ηλ. Ταχυδρομείο'
        />
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          labelText='Κωδικός'
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
        {values.isMember ? 'Σύνδεση' : 'Εγγραφή'}
        </button>
        <p>
          {values.isMember ? 'Δεν είσαι μέλος; ' : 'Είσαι ήδη μέλος; '}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Εγγράψου.' : 'Συνδέσου.'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }
  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;

export default Register;
