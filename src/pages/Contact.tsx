
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-gray-300">
              Have questions about our programs? We're here to help! Reach out to our team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <SectionHeading 
                title="Get in Touch" 
                subtitle="We'd love to hear from you! Send us a message and we'll respond as soon as possible."
                centered={false}
              />
              
              <ContactForm />
            </div>
            
            <div>
              <SectionHeading 
                title="Contact Information" 
                subtitle="Visit our academy, give us a call, or send us an email. We're always happy to help!"
                centered={false}
              />
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-myrobot-orange/10 p-4 rounded-xl text-myrobot-orange mr-4">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-myrobot-navy mb-2">Our Location</h3>
                    <p className="text-myrobot-gray">
                      123 Tech Center Drive<br />
                      Innovation City, ST 12345<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-myrobot-orange/10 p-4 rounded-xl text-myrobot-orange mr-4">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-myrobot-navy mb-2">Phone</h3>
                    <p className="text-myrobot-gray">
                      Main: (555) 123-4567<br />
                      Support: (555) 765-4321
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-myrobot-orange/10 p-4 rounded-xl text-myrobot-orange mr-4">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-myrobot-navy mb-2">Email</h3>
                    <p className="text-myrobot-gray">
                      General: info@myrobotacademy.com<br />
                      Enrollment: enroll@myrobotacademy.com<br />
                      Support: help@myrobotacademy.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-myrobot-orange/10 p-4 rounded-xl text-myrobot-orange mr-4">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-myrobot-navy mb-2">Hours of Operation</h3>
                    <p className="text-myrobot-gray">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <SectionHeading 
            title="Visit Our Academy" 
            subtitle="Come see our facilities and meet our instructors in person!"
            centered={true}
          />
          
          <div className="h-96 bg-gray-300 rounded-lg overflow-hidden shadow-md">
            {/* Placeholder for an actual map */}
            <div className="w-full h-full flex items-center justify-center bg-myrobot-navy/10">
              <p className="text-myrobot-navy font-medium">Interactive Map Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Find answers to our most commonly asked questions. Can't find what you're looking for? Contact us directly."
            centered={true}
          />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card">
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">What age groups do you serve?</h3>
              <p className="text-myrobot-gray">
                Our programs are designed for children aged 7-16, with age-specific curriculum tailored to different developmental stages and interests.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Do children need prior experience with robotics or coding?</h3>
              <p className="text-myrobot-gray">
                No prior experience is necessary! Our beginner programs start with the fundamentals and progress at an appropriate pace. For more advanced students, we offer placement assessments to ensure they're in the right program.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">What is your class size?</h3>
              <p className="text-myrobot-gray">
                We maintain small class sizes with a maximum of 12 students per instructor. This ensures that each student receives personalized attention and guidance.
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">Do students need to bring their own equipment?</h3>
              <p className="text-myrobot-gray">
                No, we provide all necessary equipment and materials. Students only need to bring their enthusiasm and creativity!
              </p>
            </div>
            
            <div className="card">
              <h3 className="font-bold text-xl text-myrobot-navy mb-2">How do I register my child for a program?</h3>
              <p className="text-myrobot-gray">
                Registration can be completed online through our parent portal, by phone, or in person at our academy. We're happy to help guide you through the process and answer any questions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
