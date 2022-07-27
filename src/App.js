import GlobalStyles from './GlobalStyles/GlobalStyles';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import { store } from './components/redux/store';
import { Provider } from 'react-redux';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: Infinity,
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                <Router>
                    <GlobalStyles>
                        <div className="App">
                            <Routes>
                                {publicRoutes.map((route, index) => {
                                    const Page = route.page;
                                    const Layout = route.layout;
                                    return (
                                        <Route
                                            key={index}
                                            path={route.path}
                                            element={
                                                <Layout>
                                                    <Page />
                                                </Layout>
                                            }
                                        />
                                    );
                                })}
                            </Routes>
                        </div>
                    </GlobalStyles>
                </Router>
            </Provider>
        </QueryClientProvider>
    );
}

export default App;
