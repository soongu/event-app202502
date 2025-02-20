import styles from './SignUpForm.module.scss';
import EmailInput from './EmailInput';
import VerificationInput from './VerificationInput';
import { useState } from 'react';

const SignUpForm = () => {

  // 현재 어떤 스텝에 위치하고 있는지
  const [step, setStep] = useState(1);

  // 이메일 중복확인이 끝났을 때 호출될 함수
  const emailSuccessHandler = () => { 
    // console.log('step1이 통과됨');
    setStep(2);
  };

  return (
    <div className={styles.signupForm}>
      <div className={styles.formStepActive}>
        {step === 1 && <EmailInput onSuccess={emailSuccessHandler} />}
        {step === 2 && <VerificationInput />}
      </div>
    </div>
  );
};

export default SignUpForm;
