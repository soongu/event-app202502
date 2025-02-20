import { useRef } from 'react';
import styles from './SignUpForm.module.scss';

const VerificationInput = () => {

  const inputsRef = useRef([]);

  // input태그들을 ref에 바인딩
  const bindInputRef = ($input, index) => {
    inputsRef.current[index] = $input;
  };

  // 초기 렌더링시 첫번째 input에 포커싱

  return (
    <>
      <p>Step 2: 이메일로 전송된 인증번호 4자리를 입력해주세요.</p>
      <div className={styles.codeInputContainer}>
        {Array.from(new Array(4)).map((_, index) => (
          <input
            ref={($input) => bindInputRef($input, index)}
            key={index}
            type='text'
            className={styles.codeInput}
            maxLength={1}
            // onChange={(e) => console.log(inputsRef.current)}
          />
        ))}
      </div>
    </>
  );
};

export default VerificationInput;
