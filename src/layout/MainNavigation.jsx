import { NavLink, useLoaderData } from 'react-router-dom';
import styles from './MainNavigation.module.scss';

const MainNavigation = () => {

  const userData = useLoaderData();

  // NavLink에 className에 바인딩하는 콜백함수
  // 현재 위치한 메뉴 정보를 알려줌
  const activeFn = ({ isActive }) => {
    // 클래스 이름을 반환
    return isActive ? styles.active : '';
  };

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.list}>
          <li>
            <NavLink
              className={activeFn}
              to='/'
              end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={activeFn}
              to='/events'>
              Events
            </NavLink>
          </li>

          { 
            userData &&
            <li>
              <button style={{ width: '100%' }}>Logout</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
