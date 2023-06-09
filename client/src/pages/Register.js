import { useState, useEffect } from 'react';
import { Logo, FormRow, Alert, LanguagesContainer } from '../components';
import styled from 'styled-components';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { translateText } from '../utils/translateText';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  language: 'ελληνικά',
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const {
    user,
    language,
    isLoading,
    showAlert,
    displayAlert,
    registerUser,
    loginUser,
  } = useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert(language);
      return;
    }

    const currentUserForRegister = { name, email, password };
    const currentUserForLogin = { email, password };

    if (isMember) {
      loginUser(currentUserForLogin, language);
    } else {
      registerUser(currentUserForRegister, language);
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
        <h3>
          {values.isMember
            ? translateText('Είσοδος', language)
            : translateText('Εγγραφή', language)}
        </h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            labelText={translateText('Όνομα', language)}
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          labelText={translateText('Ηλ. Ταχυδρομείο', language)}
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          labelText={translateText('Κωδικός', language)}
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember
            ? translateText('Είσοδος', language)
            : translateText('Εγγραφή', language)}
        </button>
        <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            loginUser(
              {
                email: 'παράδειγμα@ταχυδρομείο.gr',
                password: 'secret',
              },
              language
            );
          }}
        >
          {isLoading
            ? translateText('Φόρτωση...', language)
            : translateText('Επίδειξη Εφαρμογής', language)}
        </button>
        <p>
          {values.isMember
            ? translateText('Δεν είσαι μέλος; ', language)
            : translateText('Είσαι ήδη μέλος; ', language)}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember
              ? translateText('Εγγράψου.', language)
              : translateText('Συνδέσου.', language)}
          </button>
        </p>
        <LanguagesContainer />
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
