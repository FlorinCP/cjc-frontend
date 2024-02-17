import style from "./NotFoundPAge.module.css";


const NotFoundPage = () => {
    return (
        <div className={style.wrapper}>
            <h3>404 Not Found</h3>
            <img src="/404.png" alt="" className={style.img}/>
        </div>
    );
};

export default NotFoundPage;
