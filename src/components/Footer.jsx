const Footer = () => {
  return (
    <footer className="bg-secondary text-white pt-12 pb-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">শখের ঘর</h2>
          <p className="text-supporting text-sm">বাংলাদেশের সবচেয়ে বিশ্বস্ত অনলাইন গ্যাজেট স্টোর।</p>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="text-supporting text-sm space-y-2">
            <li><a href="#" className="hover:text-primary">About Us</a></li>
            <li><a href="#" className="hover:text-primary">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Customer Service</h3>
          <ul className="text-supporting text-sm space-y-2">
            <li><a href="#" className="hover:text-primary">Return & Refund</a></li>
            <li><a href="#" className="hover:text-primary">Track Order</a></li>
            <li><a href="#" className="hover:text-primary">Terms & Conditions</a></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p className="text-supporting text-sm">Email: support@shokherghor.com</p>
          <p className="text-supporting text-sm">Phone: +880 1234 567 890</p>
        </div>
      </div>
      <div className="text-center text-supporting text-xs mt-8 border-t border-gray-600 pt-4">
        © 2026 Shokher Ghor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;