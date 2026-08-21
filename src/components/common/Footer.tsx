const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="static footer-inner">
        <p>&copy; {year} My Blog. All rights reserved.</p>
        <ul className="footer-social">
          <li>
            <a href="https://github.com/chayoungsim/blog" target="_blank" rel="noreferrer">
              <svg aria-hidden="true" focusable="false">
                <use href={`${import.meta.env.BASE_URL}icons.svg#github-icon`} />
              </svg>
              <span className="sr-only">GitHub 저장소</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
