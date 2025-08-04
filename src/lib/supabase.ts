import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Email service functions
export const emailService = {
  // Send welcome email to new registrants
  async sendWelcomeEmail(email: string, name: string) {
    try {
      // In a real implementation, this would call Supabase Edge Functions
      // or integrate with an email service like SendGrid, Mailgun, etc.
      console.log(`Sending welcome email to: ${email}`);
      
      // Mock email send
      const emailData = {
        to: email,
        subject: 'Welcome to My Robot Academy! مرحباً بك في أكاديمية الروبوت',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #f97316); padding: 20px; color: white; text-align: center;">
              <h1>Welcome to My Robot Academy!</h1>
              <h2>مرحباً بك في أكاديمية الروبوت!</h2>
            </div>
            <div style="padding: 20px; background: #f9f9f9;">
              <p>Dear ${name},</p>
              <p>عزيزي ${name}،</p>
              
              <p>Thank you for registering with My Robot Academy! We're excited to have you join our community of young innovators.</p>
              <p>شكراً لك على التسجيل في أكاديمية الروبوت! نحن متحمسون لانضمامك إلى مجتمع المبدعين الصغار.</p>
              
              <p><strong>Next Steps / الخطوات التالية:</strong></p>
              <ul>
                <li>Complete your profile / أكمل ملفك الشخصي</li>
                <li>Browse our programs / تصفح برامجنا</li>
                <li>Contact us for enrollment / تواصل معنا للتسجيل</li>
              </ul>
              
              <p>If you have any questions, feel free to contact us at info@myrobotacademy.com</p>
              <p>إذا كان لديك أي أسئلة، لا تتردد في التواصل معنا على info@myrobotacademy.com</p>
              
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://myrobotacademy.com" style="background: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Visit Our Website</a>
              </div>
            </div>
          </div>
        `
      };
      
      // In production, you would use Supabase Edge Functions to send emails
      // await supabase.functions.invoke('send-email', { body: emailData });
      
      return { success: true, message: 'Welcome email sent successfully' };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error: 'Failed to send welcome email' };
    }
  },

  // Send newsletter subscription confirmation
  async sendNewsletterConfirmation(email: string) {
    try {
      console.log(`Sending newsletter confirmation to: ${email}`);
      
      const emailData = {
        to: email,
        subject: 'Newsletter Subscription Confirmed - My Robot Academy',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e3a8a, #f97316); padding: 20px; color: white; text-align: center;">
              <h1>Newsletter Subscription Confirmed!</h1>
              <h2>تم تأكيد اشتراك النشرة الإخبارية!</h2>
            </div>
            <div style="padding: 20px; background: #f9f9f9;">
              <p>Thank you for subscribing to our newsletter!</p>
              <p>شكراً لك على الاشتراك في نشرتنا الإخبارية!</p>
              
              <p>You'll receive updates about:</p>
              <p>ستتلقى تحديثات حول:</p>
              <ul>
                <li>New programs and courses / البرامج والدورات الجديدة</li>
                <li>Events and workshops / الفعاليات وورش العمل</li>
                <li>Special promotions / العروض الخاصة</li>
                <li>Academy news / أخبار الأكاديمية</li>
              </ul>
              
              <p>Stay tuned for exciting updates!</p>
              <p>ترقب التحديثات المثيرة!</p>
            </div>
          </div>
        `
      };
      
      return { success: true, message: 'Newsletter confirmation sent successfully' };
    } catch (error) {
      console.error('Error sending newsletter confirmation:', error);
      return { success: false, error: 'Failed to send newsletter confirmation' };
    }
  }
};