import { bgImage, goal, progress ,bank,topic} from "../assets/imageExport";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import { Footer } from "../components";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
 const [checkingAuth, setCheckingAuth] = useState(true);
 const api = import.meta.env.VITE_API_URL;
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
  useEffect(()=>{
    const fetchDetails=async()=>{
       try {
        const { data } = await axios.get(`${api}/users/status`, { withCredentials: true });
        if (data.loggedIn) {
          navigate(`/user/${data.user._id}`);
        } else {
          setCheckingAuth(false); 
        }
      } catch (err) {
        console.error(err);
        setCheckingAuth(false);
      }
    }
    fetchDetails();
  },[navigate]);

  const features = [
    {
      title: "Vast Question Bank",
      desc: "Access thousands of exam-oriented questions with detailed explanations to cover every topic thoroughly.",
      img: bank,
      bg: "bg-gradient-to-r from-sky-100 to-sky-200",
    },
    {
      title: "Daily Goal Setting",
      desc: "Stay consistent by setting and tracking your daily study goals, helping you stay on track effortlessly.",
      img: goal,
      bg: "bg-gradient-to-r from-pink-100 to-pink-200",
    },
    {
      title: "Progress Tracking",
      desc: "Monitor your accuracy, attempted questions, and growth over time with smart analytics and charts.",
      img: progress,
      bg: "bg-gradient-to-r from-green-100 to-green-200",
    },
    {
      title: "Topic-Wise Practice",
      desc: "Focus on your weak topics with targeted question sets and improve your performance steadily.",
      img: topic,
      bg: "bg-gradient-to-r from-yellow-100 to-yellow-200",
    },
  ];
if (checkingAuth) {
    // 👇 while checking, don't render home page (to avoid flicker)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen font-sans text-gray-800">
      {/* Hero Section */}
      <div
        style={{ backgroundImage: `url(${bgImage})` }}
        className="bg-cover bg-center bg-no-repeat min-h-screen relative flex items-center"
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 max-w-4xl mx-6 md:mx-20 text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
           Ace Your PG Entrance Prep!
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-sky-300 mb-6">
            With PG Prep 
          </h2>
          <p className="text-lg md:text-xl text-gray-200 mb-4">
            Smart, structured, and personalized preparation — made just for you.
          </p>
          <p className="text-md md:text-lg text-gray-300">
            Start preparing today with confidence, consistency, and clarity.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-3 bg-gradient-to-r from-sky-500 to-sky-700 text-white rounded-lg shadow-md hover:scale-105 transition duration-300"
            >
              🔍 Explore QBank
            </button>
            <button
              onClick={() => navigate("/admin")}
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white rounded-lg shadow-md hover:scale-105 transition duration-300"
            >
              ⚙️ Admin Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Why PG Prep Section */}
      <div className="py-20 bg-gray-50">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-sky-700 mb-14">
          Why Choose PG Prep?
        </h1>

        <div className="max-w-6xl mx-auto flex flex-col gap-20 px-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-10 items-center ${feature.bg} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition`}
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              {/* Image */}
              <div
                className={`flex justify-center ${
                  index % 2 !== 0 ? "md:order-2" : ""
                }`}
              >
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="w-36 h-36 object-contain drop-shadow-lg"
                />
              </div>

              {/* Text */}
              <div>
                <h2 className="text-2xl font-bold text-sky-900 mb-3">
                  {feature.title}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-sky-700">
          How PG Prep Works
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
          {[
            {
              step: "1",
              title: "Sign Up & Set Goals",
              desc: "Create your account, choose your target exam, and set your daily/weekly goals.",
            },
            {
              step: "2",
              title: "Practice & Learn",
              desc: "Access curated question banks, explanations, and topic-wise practice sets.",
            },
            {
              step: "3",
              title: "Track & Improve",
              desc: "Use our analytics to see your progress and work on weak areas effectively.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-8 bg-gray-50 shadow-md rounded-xl hover:shadow-xl transition text-center"
            >
              <div className="text-5xl font-bold text-sky-500 mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
<div className="py-16 bg-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-sky-700" data-aos="zoom-in">
            What Our Users Say
          </h2>
          <p className="text-gray-500 text-lg mt-2">Real feedback from real students.</p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          {[
            { name: 'Aditi Sharma', feedback: 'PG Prep completely transformed my preparation. The daily goals kept me consistent and confident.' },
            { name: 'Rahul Verma', feedback: 'The analytics are a game changer! I knew exactly where to focus and improved my accuracy by 20%.' },
            { name: 'Sneha Kapoor', feedback: 'I could practice anywhere on my phone, and the explanations were crystal clear. Highly recommended!' }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200" data-aos="fade-up">
              <p className="italic text-gray-700 mb-4">"{testimonial.feedback}"</p>
              <h4 className="font-bold text-sky-700">— {testimonial.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {/* Final Call-to-Action */}
      <div className="py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4  text-sky-700">
          Ready to Ace Your PG Exam?
        </h2>
        <p className="mb-8 text-lg max-w-2xl mx-auto text-gray-600">
          Join thousands of successful aspirants and start your journey today.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 bg-sky-700 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition duration-300"
        >
          Get Started Now
        </button>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
