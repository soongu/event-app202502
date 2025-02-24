import styles from './SignUpForm.module.scss';
import EmailInput from './EmailInput';
import VerificationInput from './VerificationInput';
import { useState } from 'react';
import ProgressBar from '../common/ProgressBar';
import PasswordInput from './PasswordInput';
import { AUTH_API_URL } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {

  const navigate = useNavigate();

  // 입력한 이메일과 패스워드 상태관리
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  // 회원가입 버튼 활성화 여부
  const [isActiveButton, setIsActiveButton] = useState(false);

  // 현재 어떤 스텝에 위치하고 있는지
  const [step, setStep] = useState(1);
  // 다음 스텝으로 넘어가는 여부
  const [success, setSuccess] = useState(false);

  // 다음 스텝으로 넘어가는 함수
  const nextStep = () => { 
    setSuccess(true);

    setTimeout(() => {
      setStep(prev => prev + 1);
      setSuccess(false);
    }, 1200);
  };

  // 이메일 중복확인이 끝났을 때 호출될 함수
  const emailSuccessHandler = (email) => { 
    setEnteredEmail(email);
    nextStep();
  };

  // 패스워드입력이 끝났을 때 호출함 함수
  const passwordSuccessHandler = (password, isValid) => { 
    setEnteredPassword(password);
    setIsActiveButton(isValid);
  };

  const handleSubmit = e => { 
    e.preventDefault();

    (async () => {
      const response = await fetch(`${AUTH_API_URL}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword
        })
      });

      if (!response.ok) throw new Error();

      const responseData = await response.json();
      alert(responseData.message);
      navigate('/');
      
     })();
  };

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>
        {step === 1 && <EmailInput onSuccess={emailSuccessHandler} />}
        {step === 2 && <VerificationInput email={enteredEmail} onSuccess={nextStep} />}
        {step === 3 && <PasswordInput onSuccess={passwordSuccessHandler} />}

        { isActiveButton &&
          <div>
            <button onClick={handleSubmit}>회원가입 완료</button>
          </div>
        }

        {success && <ProgressBar />}
      </div>
    </div>
  );
};

export default SignUpForm;
