import TeamLogo from "../img/group_logo.png";

export default function Home() {
    return (
        <div className="place-content-center">
        <h1 className="place-content-center text-center">Movie Database</h1>
        <h2>Developed By:</h2>
        <img src={TeamLogo} alt="TeamLogo" width="400"/>
        </div>
    );
}