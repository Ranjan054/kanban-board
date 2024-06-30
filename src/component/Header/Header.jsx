import { Link } from 'react-router-dom';

const Header = () => {

    return (
        <header className="bg-black">
            <div className="container mx-auto px-1 sm:px-4">
                <nav className="flex items-center py-4 justify-between">
                    <Link to={'/'} className="relative z-20">
                        <h3 className='font-rb text-lg leading-5.5 font-semibold text-white'>Kanban</h3>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Header;