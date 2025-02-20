import { useEffect, useRef, useState } from 'react';
import styles from './SignUpForm.module.scss';

const EmailInput = () => {
  const emailRef = useRef();

  // 에러 메시지 상태관리
  const [error, setError] = useState('');

  const validateEmailPattern = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 간단한 이메일 패턴 검사
    return emailPattern.test(email);
  };

  // 이메일 입력이벤트
  const handleEmail = (e) => {
    const inputValue = e.target.value;

    // 이메일 패턴 검증
    if (!validateEmailPattern(inputValue)) {
      // 에러메시지 세팅
      setError('이메일 형식이 유효하지 않습니다.');
      return;
    }

    // 중복체크

    setError('');
  };

  // 화면이 렌더링되자마자 입력창에 포커싱
  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <>
      <p>Step 1: 유효한 이메일을 입력해주세요.</p>
      <input
        ref={emailRef}
        type='email'
        placeholder='Enter your email'
        onChange={handleEmail}
        className={error ? styles.invalidInput : ''}
      />
      {error && <p className={styles.errorMessage}>{error}</p>}
    </>
  );
};

export default EmailInput;
