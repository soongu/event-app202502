import { useEffect, useRef, useState } from 'react';
import styles from './SignUpForm.module.scss';
import { debounce } from 'lodash';
import { AUTH_API_URL } from '../../config/host-config';

const VerificationInput = ({ email }) => {
  const inputsRef = useRef([]);

  // 입력한 인증코드 숫자값을 관리
  const [codes, setCodes] = useState(['', '', '', '']);

  // 에러 메시지
  const [error, setError] = useState('');

  // 타이머 시간을 상태관리
  const [timer, setTimer] = useState(300);

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

  // 서버에 검증요청 전송
  const fetchVerifying = debounce(async (email, verifyCode) => { 
    const response = await fetch(
      `${AUTH_API_URL}/code?email=${email}&code=${verifyCode}`
    );

    const { isMatch } = await response.json();

    // 검증에 실패했을 때
    if (!isMatch) {
      // 타이머 리셋
      setTimer(300);
      // 에러 메시지 세팅
      setError('유효하지 않거나 만료된 인증코드입니다. 인증코드를 재발송합니다.');
      // 인증코드 모두 지우기
      setCodes(Array(4).fill('')); // [ '', '', '', '' ]
      // 첫번째 칸으로 포커싱
      inputsRef.current[0].focus();
      return;
    } 

    // 검증 성공시
    // 다음 단계로 이동 신호 보내기
    // 에러메시지 제거
    setError('');

  }, 700);

  // 입력이벤트
  const handleNumber = (e, index) => {
    const inputValue = e.target.value;

    // 빈 문자열(삭제)은 허용하고, 입력값이 한 자리 숫자가 아니면 무시
    if (inputValue !== '' && !/^\d$/.test(inputValue)) {
      return;
    }

    // 입력한 숫자를 상태배열에 저장
    const copyCodes = [...codes];
    copyCodes[index - 1] = inputValue;

    setCodes(copyCodes);

    // 입력이 끝나면 다음 칸으로 포커스 이동
    if (inputValue !== '') {
      focusNextInput(index);
    }

    // 입력받은 인증코드를 서버에 전송해서 검증을 요청
    if (copyCodes.every((code) => code !== '')) {
      // 인증코드 배열의 모든 칸이 채워지면 배열의 모든 숫자를 하나로 연결
      const verifyCode = copyCodes.join('');
      // console.log('전송할 인증코드: ', verifyCode);

      // 서버로 검증 요청보내기
      fetchVerifying(email, verifyCode);
      
    }
  };

  // useEffect(() => {
  //   console.log(codes);

  //   if (codes.every((code) => code !== '')) {
  //     // 인증코드 배열의 모든 칸이 채워지면
  //     console.log('모든 칸이 채워짐!');
  //   }
  // }, [codes]);

  // 초기 렌더링시 타이머 시작 및 첫번째 input에 포커싱
  useEffect(() => {

    // 타이머 설정 - 1초마다 타이머시간을 리렌더링
    const id = setInterval(() => { 
      setTimer(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);


    inputsRef.current[0].focus();
    // console.log(codes.join(''));

    return () => clearInterval(id); 
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
            onChange={(e) => handleNumber(e, index + 1)}
            value={codes[index]}
          />
        ))}
      </div>
      <div className={styles.timer}>
        {`${'0' + Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}
      </div>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </>
  );
};

export default VerificationInput;
