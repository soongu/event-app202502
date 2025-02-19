import { Link, useNavigate } from 'react-router-dom';
import styles from './EventItem.module.scss';

const EventItem = ({ event }) => {

  const navigate = useNavigate();
  
  const {
    id,
    title,
    desc: description,
    'img-url': image,
    'start-date': date,
  } = event;


  // 삭제 처리 이벤트
  const handleRemove = e => { 

    if (!confirm('정말 삭제하시겠습니까?')) return;

    (async () => { 
      const res = await fetch(`http://localhost:9000/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) navigate('/events');
    })();

  };

  return (
    <article className={styles.event}>
      <img
        src={image}
        alt={title}
      />
      <h1>{title}</h1>
      <time>{date}</time>
      <p>{description}</p>
      <menu className={styles.actions}>
        <Link to='edit'>Edit</Link>
        <button onClick={handleRemove}>Delete</button>
      </menu>
    </article>
  );
};

export default EventItem;
