import '../../../css/style.scss';
import toastr from 'toastr';
import io from 'socket.io-client';
import {
    checkMark, logForm,
    login, logoClick, passToLogin, passToReg, regForm, registerTerms, registration,
} from '../../forms/selector';
import { ISubmitEvent } from '../../types/types';
import { api } from '../../api/api';
import { resetErrorsRegForm, schema, setErrorsRegForm } from '../../forms/schema';
import { storage } from '../../storage/storage';

const socket = io('https://lab.lectrum.io', {
    path: '/ws',
});

const { email1 } = storage.getItem('user');
socket.emit('login', `ironbank:${email1}`);

socket.on('login', (data) => {
    console.log(data);
    toastr.info('Welcome to Iron Bank');
});

logoClick.addEventListener('click', () => {
    location.href = 'index.html';
});

storage.setItem('data', []);
const token = storage.getItem('token');
const checkToken = async () => {
    try {
        await api.checkToken(token);
        setTimeout(() => { window.location.href = 'cards.html'; }, 1000);
        toastr.info(
            'you are already logged in our bank!',
            'Dear client, Congratulation!',
        );
    } catch (error) {
        console.log(error.message);
    }
};
if (token) checkToken();

passToLogin.addEventListener('click', () => {
    login.style.display = 'inherit';
    registration.style.display = 'none';
});
passToReg.addEventListener('click', () => {
    registration.style.display = 'inherit';
    login.style.display = 'none';
});
registerTerms.addEventListener('click', () => {
    registerTerms.checked;
});

regForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitEvent = event as unknown as ISubmitEvent;
    const formData = new FormData(submitEvent.target);
    const name = String(formData.get('name'));
    const email = String(formData.get('email'));
    const phone = String(formData.get('tel'));
    const password = String(formData.get('password'));
    const terms = Boolean(formData.get('terms'));

    const payloadReg = {
        name, email, phone, password,
    };

    if (terms) {
        try {
            await schema.validate(payloadReg, { abortEarly: false });
        } catch (error) {
            if (Array.isArray(error.inner)) setErrorsRegForm(error.inner);
        }

        try {
            await api.regProfile(payloadReg);
            resetErrorsRegForm();
            toastr.info(
                'You are successfully registered in our bank!',
                `Dear ${name}, Congratulation!`,
            );
            storage.setItem('user', { name, phone, email });

            return null;
        } catch (error) {
            // не выводится message
            toastr.error(error.message);
        }
    } else {
        checkMark.style.opacity = '100%';
        console.log('not checked');
    }
});


logForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitEvent = event as unknown as ISubmitEvent;
    const formData = new FormData(submitEvent.target);
    const email = String(formData.get('email'));
    const password = String(formData.get('password'));
    const terms = Boolean(formData.get('terms'));
    console.log('terms', terms);

    const payloadLog = {
        email, password,
    };

    if (terms) storage.setItem('login', { email, password });

    try {
        await schema.validate(payloadLog, { abortEarly: false });
    } catch (error) {
        if (Array.isArray(error.inner)) setErrorsRegForm(error.inner);
    }
    try {
        const data = await api.logProfile(payloadLog);
        resetErrorsRegForm();
        storage.setItem('token', data);
        if (data) {
            try {
                await api.getProfile(data);
            } catch (error) { console.log(error.message); }
        }
        const userName = storage.getItem('user').name;
        toastr.info(
            'You are successfully registered in our bank!',
            `Dear ${userName}, Congratulation!`,
        );
        setTimeout(() => {
            window.location.href = 'cards.html';
        }, 4000);

        return null;
    } catch (error) {
        // не выводится message
        toastr.error(error.message);
    }
});
