import * as yup from 'yup';
import { FieldRegForm, IYupErrors } from '../types/types';
import {
    checkMark,
    errorLogEmail, errorLogPassword,
    errorRegEmail,
    errorRegName, errorRegPassword,
    errorRegTel,
    registerEmail,
    registerName,
    registerPassword,
    registerTel,
} from './selector';

export const schema = yup.object().shape({
    [FieldRegForm.name]: yup.string().required('Required'),
    [FieldRegForm.email]: yup.string().email('Email should be valid').required('Required'),
    [FieldRegForm.phone]: yup.string().required('Required.'),
    [FieldRegForm.password]: yup.string().required('Required. Minimum 8 characters'),
    [FieldRegForm.terms]: yup.string().required('Required'),
});

export const resetErrorsRegForm = () => {
    errorRegName.style.opacity = '0';
    errorRegEmail.style.opacity = '0';
    errorRegTel.style.opacity = '0';
    errorRegPassword.style.opacity = '0';
    errorLogEmail.style.opacity = '0';
    errorLogPassword.style.opacity = '0';
    checkMark.style.opacity = '0';
};

export const setErrorsRegForm = (errors: IYupErrors[]) => {
    resetErrorsRegForm();
    for (const errorEl of errors) {
        const { path } = errorEl;
        if (path === FieldRegForm.name && registerName && errorRegName) {
            errorRegName.style.opacity = '100%';
        } else if (path === FieldRegForm.email && registerEmail) {
            if (errorRegEmail) errorRegEmail.style.opacity = '100%';
            if (errorLogEmail) errorLogEmail.style.opacity = '100%';
        } else if (path === FieldRegForm.phone && registerTel && errorRegTel) {
            errorRegTel.style.opacity = '100%';
        } else if (path === FieldRegForm.password && registerPassword) {
            if (errorRegPassword) errorRegPassword.style.opacity = '100%';
            if (errorLogPassword) errorLogPassword.style.opacity = '100%';
        }
    }
};
