import { useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/HomeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Chat from "./component/Chat";
import LoginForm from "./component/LoginForm";
import SignUpForm from "./component/SignUpForm";
import Room from "./component/Room";
import CreateRoom from "./component/CreateRoom";
import PrivateRoute from "./component/PrivateRoute";

function App() {
  const { url, genres } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);

    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<SignUpForm />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/:mediaType/:id" element={<Details />} />
          <Route path="chat/" element={<Chat />} />
          <Route path="chat/room/:roomSlug" element={<Room />} />
          <Route path="room/create" element={<CreateRoom />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
