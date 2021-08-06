import style from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={style['spinner-wrapper']}>
      <div className={style['lds-facebook']}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
