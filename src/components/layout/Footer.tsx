
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home,
  Info,
  Book, 
  Calendar,
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube
} from "lucide-react";
import { emailService } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsSubscribing(true);
    try {
      const result = await emailService.sendNewsletterConfirmation(newsletterEmail);
      
      if (result.success) {
        toast({
          title: "Subscription Successful!",
          description: "Thank you for subscribing to our newsletter. Check your email for confirmation.",
        });
        setNewsletterEmail("");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubscribing(false);
    }
  };
  
  return (
    <footer className="bg-myrobot-navy text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-myrobot-orange text-white flex items-center justify-center font-fredoka text-xl">
                MR
              </div>
              <span className="text-xl font-bold font-fredoka text-white">My Robot</span>
            </div>
            <p className="text-sm mb-6 text-gray-300">
              Building the innovators of tomorrow through hands-on STEM education focusing on robotics,
              programming, and engineering for children aged 7-16.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-myrobot-orange transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-myrobot-orange transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-myrobot-orange transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-myrobot-orange transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-myrobot-orange">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center gap-2 hover:text-myrobot-orange transition-colors">
                  <Home size={16} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-myrobot-orange transition-colors">
                  <Info size={16} />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/programs" className="flex items-center gap-2 hover:text-myrobot-orange transition-colors">
                  <Book size={16} />
                  <span>Programs</span>
                </Link>
              </li>
              <li>
                <Link to="/events" className="flex items-center gap-2 hover:text-myrobot-orange transition-colors">
                  <Calendar size={16} />
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 hover:text-myrobot-orange transition-colors">
                  <MessageSquare size={16} />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-myrobot-orange">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <span>info@myrobotacademy.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="mt-1 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Tech Center Dr.<br />Innovation City, ST 12345</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-myrobot-orange">Stay Updated</h3>
            <p className="text-sm mb-4 text-gray-300">
              Subscribe to our newsletter for the latest news, events, and promotions.
            </p>
            <form className="flex flex-col space-y-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                className="bg-myrobot-navy/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-myrobot-orange placeholder-gray-300"
                required
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="btn-primary w-full flex justify-center"
              >
                {isSubscribing ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} My Robot Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
