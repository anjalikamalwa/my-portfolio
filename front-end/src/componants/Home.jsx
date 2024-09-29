import React, { useState, useEffect } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

const Home = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [message, setMessage] = useState([]); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Please enter your name";
    if (!form.email.trim() || !validateEmail(form.email.trim()))
      newErrors.email = "Please enter a valid email address";
    if (!form.phone.trim() || !validatePhone(form.phone.trim()))
      newErrors.phone = "Please enter a valid 10-digit phone number";
    if (!form.subject.trim()) newErrors.subject = "Please enter a subject";
    if (!form.message.trim()) newErrors.message = "Please enter a message";
    return newErrors;
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch(`${apiUrl}/api/message/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }

        const newMessage = await response.json();
        setMessage([...message, newMessage]);
        toast.success("Message sent successfully !", {
          autoClose: 1500,
        });

        setForm({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <>
    <ToastContainer/>
      <div className="header">
        <nav className="navbar">
          <div className="logo-d">
            <a href="#home" className="logo">
              Portfolio
            </a>
          </div>
          <div
            className="nav-toggle show text-white"
            onClick={handleMenuToggle}
          >
            {menuOpen ? <MdClose size={30} /> : <MdMenu size={30} />}
          </div>
          <ul className={`nav-list m-0 ${menuOpen ? "open" : ""}`}>
            <li>
              <a href="#home" className="nav-link1">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link1">
                About
              </a>
            </li>
            <li>
              <a href="#skills" className="nav-link1">
                Skills
              </a>
            </li>
            <li>
              <a href="#projects" className="nav-link1">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link1">
                Contact Me
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <section className="home-section" id="home">
        <div className="home-content">
          <div className="content-d">
            <h3>Hi, I'm</h3>
            <h1>Anjali Kamalwa</h1>
            <h3>
              a <span>web Developer</span>
            </h3>
            <p className="content-m">
              based in Mandsaur. With a love for all things digital and a knack
              for problem-solving, I've dedicated myself to crafting beautiful
              and functional websites that make an impact.
            </p>
            <div className="social-media">
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a href="#">
                <i className="bx bxl-github"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </div>
            <div className="btn">
              <button className="border-btn">More Info</button>
            </div>
          </div>
        </div>
        <div className="home-image">
          <img src="./images/hero.jpg" alt="" />
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-image">
          <img src="./images/hero.jpg" alt="" style={{ borderRadius: "0%" }} />
        </div>
        <div className="about-content">
          <div className="content-d">
            <h3>
              About <span style={{ color: "#5982F4" }}>Me</span>
            </h3>
            <h1>Web Developer</h1>
            <p className="content-m">
              My journey in web development began during my college years, where
              I discovered my fascination for turning ideas into digital
              realities. Since then, I've immersed myself in the world of
              coding, constantly seeking to expand my knowledge and skill set.
            </p>
            <p className="content-m">
              My arsenal includes HTML5, CSS3, JavaScript, React.js, Node.js,
              and more. Whether it's bringing designs to life or optimizing site
              performance, I pride myself on writing clean, efficient code that
              stands the test of time.
            </p>
            <div className="btn-d mt-4">
              <button className="border-btn primary-btn">More Info</button>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <h3 className="main-heading">Skills</h3>
        <div className="skills-content">
          <div className="html">
            <img src="./images/html.png" alt="" />
          </div>
          <div className="css">
            <img src="./images/css.png" alt="" />
          </div>
          <div className="javascript">
            <img src="./images/javascript.png" alt="" />
          </div>
          <div className="reactjs">
            <img src="./images/reactjs.png" alt="" />
          </div>
          <div className="nodejs">
            <img src="./images/nodejs.png" alt="" />
          </div>
          <div className="mysql">
            <img src="./images/mysql-logo-1.png" alt="" />
          </div>
        </div>
      </section>

      <section className="project-section" id="projects">
        <h3 className="main-heading">Projects</h3>
        <div className="our-projects">
          <div className="projects-content">
            <img src="./images/forproject.png" />
            <p>
              The Online Photography Gallery System aims to offer an engaging
              platform where visitors can appreciate the artistry of the
              photographers, gain insights into their techniques and
              inspirations, and easily navigate through various sections
              including Home, About, Gallery, Services, and Contact. This system
              not only serves as a portfolio for photographers but also as an
              interactive gallery that connects the audience with the art of
              photography.
            </p>
          </div>
          <div className="projects-content">
            <img src="./images/contact-task.png" />
            <p>
              A contact page in a MERN stack application allows users to submit
              inquiries or messages through a form. The form captures details
              like name, email, and message, which are sent to the backend using
              Express.js and stored in MongoDB. React handles the form's
              front-end validation and dynamic feedback, while Node.js processes
              the submission, potentially sending email notifications to the
              site owner.
            </p>
          </div>
          <div className="projects-content">
            <img src="./images/blog.png" />
            <p>
              A blog platform built with the MERN stack allows users to create,
              read, update, and delete blog posts. React handles the user
              interface for displaying and managing posts, while Express.js and
              Node.js manage the backend logic for routing and processing
              requests. MongoDB stores the blog posts, user data, and comments,
              enabling dynamic content updates and a smooth user experience.
            </p>
          </div>
          <div className="projects-content">
            <img src="./images/todolist1.png" />
            <p>
              A to-do list task application built with the MERN stack helps
              users manage their daily tasks efficiently. React provides an
              interactive user interface for adding, updating, and deleting
              tasks, while Node.js and Express.js handle backend operations like
              routing and task management. MongoDB stores the tasks, enabling
              persistent data management, ensuring that tasks remain accessible
              even after reloading the application.
            </p>
          </div>
          <div className="projects-content">
            <img src="./images/properties.png" />
            <p>
              A property booking platform built using the MERN stack (MongoDB,
              Express.js, React, and Node.js) allows users to search, view, and
              book properties online. It provides property listings with details
              like location, price, and amenities, and includes features for
              filtering and sorting properties based on user preferences. The
              backend ensures seamless data management and booking transactions,
              while the frontend offers a responsive and dynamic experience.
            </p>
          </div>
        </div>
      </section>
      <section className="contact-section" id="contact">
        <h3 className="main-heading">Contact Me</h3>
        <form className="contactForm" id="contact-form" onSubmit={handleSubmit}>
          <div className="first-part">
            <input
              placeholder="Your Name"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="error">{errors.name}</div>
            )}

            <input
              placeholder="Your Email"
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="error">{errors.email}</div>
            )}

            <input
              placeholder="Your Phone"
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && (
              <div className="error">{errors.phone}</div>
            )}

            <input
              placeholder="Subject"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            />
            {errors.subject && (
              <div className="error">{errors.subject}</div>
            )}
          </div>

          <div className="second-part">
            <textarea
              placeholder="Your message"
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <div className="error">{errors.message}</div>}

            <div className="btn-d">
              <button type="submit" className="default-btn primary-btn">
                Send
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Home;
