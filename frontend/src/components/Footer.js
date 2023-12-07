import TeamLogo from "../img/group_logo.png";

const Footer = () => {
  return (
    <footer className="text-center mx-auto">
            
            <img src={TeamLogo} alt="TeamLogo" width="200" className="mx-auto" />
            <span id="footerText">Developed by Team WebKaholics &copy; 2023</span>
    </footer>
  );
};

export default Footer;