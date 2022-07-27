import Container from '../components/Container';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';

function MainLayout({ children }) {
    return (
        <div>
            <Container className="md:flex-col">
                <div className="sticky md:static top-0 w-80 md:w-full h-screen p-8">
                    <LeftSidebar />
                </div>
                <div className="flex-1 bg-gray-100">
                    <Header />
                    {children}
                </div>
            </Container>
        </div>
    );
}

export default MainLayout;
