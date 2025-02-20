import { useEffect, useRef } from 'react';
import styles from './SignUpForm.module.scss';

const VerificationInput = () => {

  const inputsRef = useRef([]);

  // input태그들을 ref에 바인딩
  const bindInputRef = ($input, index) => {
    inputsRef.current[index] = $input;
  };

  // 포커스를 다음칸으로 이동하는 함수
  const focusNextInput = (index) => { 
    // 인덱스 검증 - 마지막 칸에서는 포커스 이동 금지
    if (index < inputsRef.current.length) {
      inputsRef.current[index].focus();
    } else {
      // 마지막 칸에서는 포커스 해제
      inputsRef.current[index - 1].blur();
    }
  };

  // 입력이벤트
  const handleNumber = (e, index) => { 
    

    // 입력이 끝나면 다음 칸으로 포커스 이동
    focusNextInput(index);
  };

  // 초기 렌더링시 첫번째 input에 포커싱
  useEffect(() => { 
    inputsRef.current[0].focus();
  }, []);

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
            onChange={e => handleNumber(e, index + 1)}
          />
        ))}
      </div>
    </>
  );
};

export default VerificationInput;
