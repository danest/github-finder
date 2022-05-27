import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function Footer() {

  const footerYear = new Date().getFullYear()

  return (
      <footer className='footer p-10 bg-gray-700 text-primary-content footer-center'>
        <p>Copyright { footerYear }</p>
      </footer>
  )
}

export default Footer