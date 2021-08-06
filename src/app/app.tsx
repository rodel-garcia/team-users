import style from './app.module.scss';
import UserList from './components/user-list/user-list';

const App = () => (
  <div className={style['team-users-app']}>
    <UserList />
  </div>
);

export default App;
