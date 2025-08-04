import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import AccessGate from "@/components/ui/AccessGate";
import { useState, useEffect } from "react";
import { Play, Calendar, Trophy, Users } from "lucide-react";
import { getGalleryItems, type GalleryItem } from "@/lib/localStorage";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const savedItems = getGalleryItems();
    setGalleryItems(savedItems);
  }, []);

  const tabs = [
    { id: "projects", label: "Student Projects", icon: <Users size={20} /> },
    { id: "events", label: "Events & Competitions", icon: <Trophy size={20} /> },
    { id: "achievements", label: "Achievements", icon: <Calendar size={20} /> }
  ];

  const studentProjects = galleryItems.filter(item => item.category === "projects");
  const events = galleryItems.filter(item => item.category === "events");

  const achievements = [
    {
      id: 1,
      title: "100+ Students Graduated",
      description: "Over 100 students have completed our programs successfully",
      icon: <Users size={40} className="text-myrobot-orange" />
    },
    {
      id: 2,
      title: "15 Competition Wins",
      description: "Our teams have won 15 robotics competitions in the past 2 years",
      icon: <Trophy size={40} className="text-myrobot-orange" />
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-myrobot-navy to-myrobot-navy/90 text-white">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-myrobot-orange blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-myrobot-mint blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 z-10 py-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Media Gallery</h1>
            <p className="text-xl text-gray-300">
              Explore the amazing projects, achievements, and moments from our STEM learning community.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Tabs */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  activeTab === tab.id
                    ? "bg-myrobot-navy text-white shadow-md"
                    : "bg-gray-100 text-myrobot-navy hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Student Projects */}
          {activeTab === "projects" && (
            <AccessGate requiredLevel={2}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {studentProjects.map(project => (
                  <div key={project.id} className="card group hover:shadow-xl transition-shadow">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {project.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <Play size={48} className="text-white" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-xl text-myrobot-navy mb-2">{project.title}</h3>
                    <p className="text-myrobot-orange font-medium mb-2">{project.student}</p>
                    <p className="text-myrobot-gray">{project.description}</p>
                  </div>
                ))}
              </div>
            </AccessGate>
          )}

          {/* Events */}
          {activeTab === "events" && (
            <AccessGate requiredLevel={2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map(event => (
                  <div key={event.id} className="card group hover:shadow-xl transition-shadow">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {event.achievement && (
                        <div className="absolute top-4 right-4 bg-myrobot-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                          {event.achievement}
                        </div>
                      )}
                    </div>
                    {event.date && (
                      <div className="flex items-center gap-2 text-myrobot-gray text-sm mb-2">
                        <Calendar size={16} />
                        {event.date}
                      </div>
                    )}
                    <h3 className="font-bold text-xl text-myrobot-navy mb-2">{event.title}</h3>
                    <p className="text-myrobot-gray">{event.description}</p>
                  </div>
                ))}
              </div>
            </AccessGate>
          )}

          {/* Achievements */}
          {activeTab === "achievements" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {achievements.map(achievement => (
                <div key={achievement.id} className="card text-center">
                  <div className="bg-myrobot-orange/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {achievement.icon}
                  </div>
                  <h3 className="font-bold text-xl text-myrobot-navy mb-2">{achievement.title}</h3>
                  <p className="text-myrobot-gray">{achievement.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;