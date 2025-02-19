import { Form, useNavigate } from 'react-router-dom';
import styles from './EventForm.module.scss';

const EventForm = ({ method, event = {} }) => {

  // 링크 이동시 새로고침 없이 이동하는 훅
  const navigate = useNavigate();

  const { title, desc, 'img-url': image, 'start-date': date } = event;

  // yyyy년 MM월 dd일 ->  yyyy-MM-dd 로 변경
  const formatDate = (date) => { 

    if (!date) return;

    const [yearPart, monthDayPart] = date.split('년 ');
    const [monthPart, dayPart] = monthDayPart.split('월 ');
    
    return `${yearPart}-${monthPart}-${dayPart.replace('일', '')}`;
    
  };

  // 서버로 데이터 보내기
  // const handleSubmit = e => {
  //   e.preventDefault();

  //   // form에 입력한 값 가져오기
  //   const formData = new FormData(e.target);

  //   // 서버에 보낼 데이터 만들기
  //   const payload = {
  //     title: formData.get('title'),
  //     desc: formData.get('description'),
  //     imageUrl: formData.get('image'),
  //     beginDate: formData.get('date')
  //   };
  //   // console.log(payload);

  //   // 서버로 페칭
  //   const fetchPost = async () => {
  //     const response = await fetch(`http://localhost:9000/api/events`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (response.ok) {
  //       // window.location.href = '/events';
  //       navigate('/events');
  //     }
  //   };

  //   fetchPost();
    
    
  // };

  // 2. action함수를 트리거하려면 일단 react-router-dom에서 제공하는 Form을 사용하고
  // 3. method옵션을 설정함
  return (
    <Form
      method={method}
      className={styles.form}
      noValidate
      // onSubmit={handleSubmit}
    >
      <p>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          name='title'
          required
          defaultValue={event ? title : ''}
        />
      </p>
      <p>
        <label htmlFor='image'>Image</label>
        <input
          id='image'
          type='url'
          name='image'
          required
          defaultValue={event ? image : ''}
        />
      </p>
      <p>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='date'
          name='date'
          required
          defaultValue={event ? formatDate(date) : ''}
        />
      </p>
      <p>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          rows='5'
          required
          defaultValue={event ? desc : ''}
        />
      </p>
      <div className={styles.actions}>
        <button
          type='button'
          onClick={() => navigate('..')}>
          Cancel
        </button>
        <button>{method === 'POST' ? 'Save' : 'Modify'}</button>
      </div>
    </Form>
  );
};

export default EventForm;
