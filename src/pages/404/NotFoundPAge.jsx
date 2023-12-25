import style from "./NotFoundPAge.module.css";


const NotFoundPage = () => {
    return (
        <div className={style.wrapper}>
            <h1>404 Not Found</h1>
            <img src="/404.png" alt="" className={style.img}/>
        </div>
    );
};

export default NotFoundPage;
