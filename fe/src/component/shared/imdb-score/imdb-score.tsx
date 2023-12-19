import Image from "next/image";
import classes from "./imdb-score.module.css";

type Props = {
    score: number;
};

const ImDbScore = ({ score }: Props) => {
    return (
        <div className={classes.root}>
            <Image src="/images/star.png" alt="start" width={50} height={50} />
            <div className={classes.main}>
                <span>{score.toFixed(1)}</span>
            </div>
        </div>
    );
};

export default ImDbScore;
