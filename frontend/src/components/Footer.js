import TeamLogo from "../img/group_logo.png";

const Footer = () => {
  return (
    <footer className="text-center mx-auto py-4">
      <img src={TeamLogo} alt="TeamLogo" width="180" className="mx-auto" />
      <br/>
      <span id="footerText">Developed by WebKaholics &copy; 2023</span>
    </footer>
  );
};

export default Footer;