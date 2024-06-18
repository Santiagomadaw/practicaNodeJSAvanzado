import { useState } from 'react';
import Form from '../../components/shared/Form';
import Layout from '../../components/layout/Layout';
import FormField from '../../components/shared/FormField';
import RawSwitch from '../../components/shared/Switch';
import styled from 'styled-components';
import ErrorMessage from '../../components/shared/ErrorMessage';
import Button from '../../components/shared/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    authLogin,
    uiResetError,
} from '../../store/actions';
import { getError, getPending } from '../../store/selectors';
import { Loading } from '../../components/shared/Loading';

export default function LoginPage() {
    const dispatch = useDispatch();
    const resetError = () => dispatch(uiResetError());
    const errorState = useSelector(getError);
    const pending = useSelector(getPending);
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        save: false,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        resetError();
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [name]: value,
        }));
    };
    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;
        resetError();
        setFormValues((currentFormValues) => ({
            ...currentFormValues,
            [name]: checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(authLogin(formValues))
       
        
    };

    const { email, password } = formValues;
    const buttonDisabled = !email || !password;
    return (
        <Layout>
            <StyledLogin className='loginPage'>
                <h1 className='loginPage-title'>Login</h1>
                <Form id='login-form' $variant='column' $customwidth='100%'>
                    <FormField
                        $customheight='38px'
                        $customwidth='100%'
                        type='text'
                        name='email'
                        id='email'
                        onChange={handleChange}
                    />
                    <FormField
                        $customheight='38px'
                        $customwidth='100%'
                        type='password'
                        name='password'
                        id='password'
                        onChange={handleChange}
                    />
                    <RawSwitch
                        Name='save'
                        checked={true}
                        onChange={handleSwitchChange}
                        Rightname='Guardar'
                    />
                    <Button
                        type='submit'
                        disabled={buttonDisabled}
                        className='loginButton'
                        onClick={handleSubmit}
                        $customwidth='100%'
                    >
                        Login
                    </Button>
                </Form>
                {pending && <Loading />}
            {errorState && (
                <ErrorMessage className='loginPage-error' onClick={resetError}>
                    <h3>{errorState.toUpperCase()}</h3>
                </ErrorMessage>
            )}
            </StyledLogin>
            
        </Layout>
    );
}
const StyledLogin = styled.div`
    display: flex;
    margin: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    height: 100%;
    width: fit-content;

    .loginPage-title {
        color: var(--text-100);
    }
`;
