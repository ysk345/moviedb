import TeamLogo from "../img/group_logo.png";

export default function Home() {
    return (
        <>
        <h1 className="place-content-center">Movie Database</h1>
        <img src={TeamLogo} alt="TeamLogo" width="200" />
        </>
    );
}