import React from "react";
import { useNavigate } from "react-router-dom";

const speakers = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s",
    name: "John Doe",
    title: "The Future of AI",
    link: "#",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s",
    name: "Jane Smith",
    title: "Designing for Tomorrow",
    link: "#",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH5sFjZPx1Yzi1b9_FpQzrxqgsjv2DPAp81Q&s",
    name: "Alex Johnson",
    title: "Sustainability in Tech",
    link: "#",
  },
];

const DescriptionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-8 py-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/editions")}
          className="group inline-flex items-center text-white mb-8"
        >
          <span className="mr-2 transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          <span className="relative">
            List of editions
            <span className="absolute -bottom-px left-0 w-full h-[1px] bg-red-600" />
          </span>
        </button>

        {/* Header Section */}
        <div className="mb-12">
          <p className="text-gray-400 text-lg md:text-xl mb-4">
            SATURDAY, MAY 4, 2024
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Main Event Heading
          </h1>
        </div>

        {/* Main Image */}
        <div className="mb-16 p-4 md:p-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhTODHGKBPA0P-Dmdn9uDUGzLRzpfDPGmbA&s"
            alt="Event"
            className="w-full h-[400px] md:h-[600px] object-cover rounded-3xl"
          />
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Seek beyond the obvious
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              "Seek" isn't just about chasing answers; it's about falling in
              love with the whole process of asking questions, challenging what
              we think we know, and keeping that flame of curiosity burning so
              bright such that not only we get benefitted but the others who are
              in the shadows of knowledge may become a guiding light themselves.
              We believe in embracing the adventure of learning, growing, and
              staying open to fresh perspectives.
            </p>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              What we think?{" "}
            </h2>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
              At TEDxIPSA Indore, we take the "Seek" theme as our guide to shake
              things up, surprise ourselves, and explore the countless ways
              people have found their own unique paths of discovery.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <div className="aspect-video rounded-xl overflow-hidden">
            <iframe
              title="Event Video"
              src="https://youtu.be/T7olkUQYUcY?si=cICXvs_QDGpPmboF"
              className="w-full h-full"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Ways to Watch */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
            3 ways to watch the event
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Widespread events", "In Streaming Online", "Main Event"].map(
              (way, index) => (
                <div key={index} className="group">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{way}</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Join us at various locations to experience the event with
                    others.
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Speakers Section */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Speakers on stage
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Meet the incredible speakers who shared their inspiring stories and
            groundbreaking ideas.
          </p>

          {/* Speakers Cards */}
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="min-w-[300px] bg-zinc-900 rounded-xl overflow-hidden snap-start group"
              >
                {/* Image Container */}
                <div className="relative h-[240px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-red-600/20 opacity-70" />
                  <img
                    src={speaker.image}
                    alt={speaker.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-gray-400 text-sm mb-2">{speaker.name}</h3>
                  <p className="text-white text-xl font-bold mb-6">
                    {speaker.title}
                  </p>
                  <a
                    href={speaker.link}
                    className="group/link inline-flex items-center text-white relative"
                  >
                    Watch the Talk
                    <span className="ml-2 transform transition-transform duration-300 group-hover/link:translate-x-1">
                      →
                    </span>
                    <span className="absolute -bottom-px left-0 w-0 h-[1px] bg-red-600 transition-all duration-300 group-hover/link:w-full" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionPage;
