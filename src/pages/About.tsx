
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import TeamMemberCard from "@/components/ui/TeamMemberCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About My Robot Academy</h1>
            <p className="text-xl text-gray-300">
              Building the innovators of tomorrow through hands-on STEM education and critical thinking.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p className="text-lg text-myrobot-gray mb-6">
                At My Robot Academy, we're dedicated to inspiring and empowering the next generation of innovators through engaging, hands-on STEM education. We believe that every child deserves the opportunity to explore the exciting world of robotics, programming, and engineering in a supportive, creative environment.
              </p>
              <p className="text-lg text-myrobot-gray">
                Our mission is to make technology accessible and exciting for all children, regardless of their background or prior experience, and to foster the critical thinking and problem-solving skills they'll need to thrive in an increasingly technological world.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Children learning robotics" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mt-20">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Programming education" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="section-title">Our Vision</h2>
              <p className="text-lg text-myrobot-gray mb-6">
                We envision a world where children approach technology not just as consumers, but as creators and problem solvers. Where curiosity is encouraged, failure is seen as a stepping stone to success, and every child recognizes their potential to make a positive impact through innovation.
              </p>
              <p className="text-lg text-myrobot-gray">
                By providing age-appropriate, challenging, and fun learning experiences, we aim to spark a lifelong passion for learning and discovery that extends well beyond our classroom walls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeading 
            title="Our Teaching Approach" 
            subtitle="We believe that children learn best when they're engaged, challenged, and having fun. Our unique methodology combines these elements to create an optimal learning environment."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card text-center">
              <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-myrobot-orange">1</span>
              </div>
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Learn by Doing</h3>
              <p className="text-myrobot-gray">
                We prioritize hands-on experiences over lectures. Our students build, code, test, and iterate, internalizing concepts through direct application.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-myrobot-orange">2</span>
              </div>
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Age-Appropriate Challenges</h3>
              <p className="text-myrobot-gray">
                Our curriculum is carefully designed to meet children where they are developmentally while providing the right level of challenge to keep them engaged.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="bg-myrobot-orange/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-myrobot-orange">3</span>
              </div>
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Collaborative Learning</h3>
              <p className="text-myrobot-gray">
                Students work together on projects, developing communication skills, empathy, and an appreciation for diverse perspectives and problem-solving approaches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionHeading 
            title="Meet Our Team" 
            subtitle="Our instructors combine technical expertise with a passion for teaching, creating an inspiring learning environment for all students."
            centered={true}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TeamMemberCard 
              name="Dr. Robert Chen"
              role="Founder & Lead Instructor"
              bio="With a Ph.D. in Robotics Engineering and 10+ years of experience teaching children, Dr. Chen founded My Robot Academy to make STEM education accessible and engaging for all children."
            />
            <TeamMemberCard 
              name="Sarah Johnson"
              role="Programming Instructor"
              bio="Sarah brings 8 years of software development experience and a talent for breaking down complex concepts into fun, manageable lessons that inspire confidence in young programmers."
            />
            <TeamMemberCard 
              name="Michael Rodriguez"
              role="Engineering Specialist"
              bio="A mechanical engineer with a background in educational technology, Michael specializes in teaching design thinking and engineering principles through creative, hands-on projects."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-myrobot-navy to-myrobot-navy/80 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our STEM Community Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-300">
            Give your child the gift of hands-on learning in a supportive, creative environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/programs">
              <Button className="btn-primary text-lg">
                View Our Programs
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="text-white border-white hover:bg-white/10 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
