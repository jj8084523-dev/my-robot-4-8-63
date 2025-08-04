import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Trophy, Award, Users, Target, Star, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { getAchievements, type Achievement } from "@/lib/localStorage";

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "Trophy": return <Trophy size={48} className="text-myrobot-orange" />;
    case "Award": return <Award size={48} className="text-myrobot-orange" />;
    case "Users": return <Users size={48} className="text-myrobot-orange" />;
    case "Target": return <Target size={48} className="text-myrobot-orange" />;
    case "Star": return <Star size={48} className="text-myrobot-orange" />;
    default: return <Trophy size={48} className="text-myrobot-orange" />;
  }
};

const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    const savedAchievements = getAchievements();
    setAchievements(savedAchievements);
  }, []);

  const statistics = [
    { number: "500+", label: "Students Graduated", icon: <Users size={32} /> },
    { number: "25+", label: "Competition Wins", icon: <Trophy size={32} /> },
    { number: "50+", label: "Projects Completed", icon: <Target size={32} /> },
    { number: "4.9/5", label: "Parent Satisfaction", icon: <Star size={32} /> }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Academy Founded",
      description: "Started with 10 students and a dream to make STEM accessible"
    },
    {
      year: "2021", 
      title: "First Competition Win",
      description: "Our robotics team placed 1st in the local competition"
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Opened new labs and added advanced programming courses"
    },
    {
      year: "2023",
      title: "Regional Recognition",
      description: "Awarded Best STEM Academy in the region"
    },
    {
      year: "2024",
      title: "Championship Victory",
      description: "Won the Regional Robotics Championship"
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Achievements</h1>
            <p className="text-xl text-gray-300">
              Celebrating our journey of excellence in STEM education and the remarkable achievements of our students.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="card text-center">
                <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-myrobot-orange">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold text-myrobot-navy mb-2">{stat.number}</h3>
                <p className="text-myrobot-gray">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Major Achievements */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeading 
            title="Major Achievements" 
            subtitle="Highlighting our most significant accomplishments and recognitions"
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map(achievement => (
              <div key={achievement.id} className="card group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={achievement.image} 
                    alt={achievement.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-myrobot-orange/10 p-3 rounded-xl">
                    {getIconComponent(achievement.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-myrobot-gray text-sm mb-1">
                      <Calendar size={16} />
                      {achievement.date}
                    </div>
                    <h3 className="font-bold text-xl text-myrobot-navy">{achievement.title}</h3>
                  </div>
                </div>
                <p className="text-myrobot-gray">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionHeading 
            title="Our Journey" 
            subtitle="Key milestones in our academy's growth and success"
            centered={true}
          />
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-myrobot-orange/20 hidden md:block"></div>
              
              {/* Timeline items */}
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className="flex items-start gap-6">
                    <div className="bg-myrobot-orange text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.year}
                    </div>
                    <div className="card flex-1">
                      <h3 className="font-bold text-xl text-myrobot-navy mb-2">{item.title}</h3>
                      <p className="text-myrobot-gray">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Achievements;