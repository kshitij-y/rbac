
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-6 bg-gray-100 text-gray-700">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Branding */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">
            <span className="text-blue-700">write</span>Flow
          </h2>
          <p className="text-sm">© {year} YourBlog. All rights reserved.</p>
          <p className="text-sm text-gray-700">
            Developed by{" "}
            <a
              href="https://github.com/kshitij-y"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 hover:font-medium">
              Kshitij Yadav
            </a>
          </p>
        </div>

        {/* Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://github.com/kshitij-y"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500">
            <FaGithub size={22} />
          </a>
          <a
            href="https://www.linkedin.com/in/kshitij620"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-500">
            <FaLinkedin size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
