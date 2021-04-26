
const {Link} = window.ReactRouterDOM;


const HomePage = () => {
  const pages = ['applications','sections','students','courses','professors']
  return(
      <div>
        <h2>HomePage</h2>
        <ul>
          {
            pages.map(page =>
                <li key={page}>
                  <Link to={`/${page}`}>
                    {page}
                  </Link>
                </li>)
          }
        </ul>
      </div>
  )
}

export default HomePage;