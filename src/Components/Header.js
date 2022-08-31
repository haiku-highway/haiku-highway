import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <h1><Link to='/'>haiku highway.</Link></h1>
            <nav>
                <ul>
                    <li>
                        <Link to='/howto'>how to</Link>
                    </li>
                    <li>
                        <Link to='/credits'>credits</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;