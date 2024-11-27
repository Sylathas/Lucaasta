import React, { useState, useEffect } from 'react';
import './App.css'
import Home from './components/Home'
import Project from './components/Project'
import About from './components/About'
import Contact from './components/Contact'
import { Route, Routes } from "react-router-dom"
import Menu from './components/Utility/Menu'
import Edges from './components/Utility/Edges'
import { ProjectData, AboutData } from './components/Utility/getData.jsx'

function App() {
  const [category, setCategory] = useState('Art');
  const [loading, setLoading] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [aboutData, setAboutData] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [themeChanging, setThemeChanging] = useState(false);
  const [filmText, setFilmText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const fetchedProjectData = await ProjectData();
    const sortedProjectsArray = fetchedProjectData.sort((a, b) => b.date.seconds - a.date.seconds);
    setProjectData([...sortedProjectsArray]);
    const fetchedAboutData = await AboutData();
    setAboutData([...fetchedAboutData]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (themeChanging) {
      const timer = setTimeout(() => {
        setThemeChanging(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [themeChanging]);

  useEffect(() => {
    const bodyClassList = document.body.classList;

    // Apply theme classes
    if (isDarkTheme) {
      bodyClassList.add('dark-theme');
      bodyClassList.remove('light-theme');
    } else {
      bodyClassList.add('light-theme');
      bodyClassList.remove('dark-theme');
    }

    // Apply or remove animation class
    if (themeChanging) {
      bodyClassList.add('rootAnimation');
    } else {
      bodyClassList.remove('rootAnimation');
    }
  }, [isDarkTheme, themeChanging]);

  const setFilter = (type) => {
    if (type === 'Film' || type === 'Artist Film' || type === 'Commercial Film') {
      if (!isDarkTheme) {
        setThemeChanging(true);
        setIsDarkTheme(true);
        setTimeout(() => { setCategory(type) }, 250);
      } else {
        setCategory(type)
      }
      if (type === 'Artist Film') {
        setFilmText('Luca Asta’s independent films work ranges from experimental moving image works shown in contemporary art spaces to narrative short films screened at international film festivals.');

      } else if (type === 'Commercial Film') {
        setFilmText('Luca Asta collaborates as a director on commissioned films and documentaries for queer charities, organisations, and fashion designers, with a focus on projects that resonate with her advocacy for inclusivity and representation. Please use the contact form for inquiries or collaboration.');
      } else {
        setFilmText('');
      }
    } else {
      setFilmText('');
      if (isDarkTheme) {
        setThemeChanging(true);
        setIsDarkTheme(false);
        setTimeout(() => { setCategory(type) }, 250);
      } else {
        setCategory(type)
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Menu setFilter={setFilter} data={aboutData} isDarkTheme={isDarkTheme} filmText={filmText} category={category} />
      <Edges isDarkTheme={isDarkTheme} themeChanging={themeChanging} />
      <div id="content" className={themeChanging ? 'contentAnimation' : ''}>
        <Routes>
          <Route
            path="/"
            element={<Home data={projectData} category={category} setFilter={setFilter} isDarkTheme={isDarkTheme} />}
          />
          <Route path="/about" element={<About data={aboutData} isDarkTheme={isDarkTheme} />} />
          <Route path="/contact" element={<Contact data={aboutData} isDarkTheme={isDarkTheme} />} />
          <Route path="/:id" element={<Project isDarkTheme={isDarkTheme} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
