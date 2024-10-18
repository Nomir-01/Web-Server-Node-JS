export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300">
                  Products
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>&copy; 2023 Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
