import React, { useEffect, useState } from 'react';

const About = ({ data, isDarkTheme }) => {
    const [educationArray, setEducationArray] = useState([]);
    const [residenciesArray, setResidenciesArray] = useState([]);
    const [exhibitionArray, setExhibitionArray] = useState([]);
    const [festivalArray, setFestivalArray] = useState([]);
    const [awardsArray, setAwardsArray] = useState([]);
    const [pressArray, setPressArray] = useState([]);

    const processData = (string) => {
        const items = string
            ?.trim()
            .split('\n')
            .flatMap((line) => line.split(' | '));
        let result = [];
        for (let i = 0; i < items.length; i += 2) {
            result.push({ year: items[i], text: items[i + 1] });
        }
        return result;
    };

    useEffect(() => {
        if (data.length > 0) {
            setEducationArray(processData(data?.[0]?.education));
            setResidenciesArray(processData(data?.[0]?.residencies));
            setExhibitionArray(processData(data?.[0]?.exhibitions_events));
            setFestivalArray(processData(data?.[0]?.film_festival_screenings));
            setAwardsArray(processData(data?.[0]?.awards));
            setPressArray(processData(data?.[0]?.press_online));
        }
    }, [data]);

    const entries = [
        { title: 'Education', dataArray: educationArray },
        { title: 'Residencies', dataArray: residenciesArray },
        { title: 'Exhibitions & Events', dataArray: exhibitionArray },
        { title: 'Film Festivals & Screenings', dataArray: festivalArray },
        { title: 'Awards', dataArray: awardsArray },
        { title: 'Press', dataArray: pressArray },
    ];

    const midIndex = Math.ceil(entries.length / 2);
    const firstColumnEntries = entries.slice(0, midIndex);
    const secondColumnEntries = entries.slice(midIndex);

    const textClassName = isDarkTheme ? 'textColorDark' : 'textColorLight';

    return (
        <div id="about">
            <p id="longBio" className={textClassName}>
                {data?.[0]?.long_bio}
            </p>
            <div className="aboutGrid">
                <div className="aboutColumn">
                    {firstColumnEntries.map((entry, index) => (
                        <AboutEntry key={index} title={entry.title} dataArray={entry.dataArray} isDarkTheme={isDarkTheme} />
                    ))}
                </div>
                <div className="aboutColumn">
                    {secondColumnEntries.map((entry, index) => (
                        <AboutEntry key={index + midIndex} title={entry.title} dataArray={entry.dataArray} isDarkTheme={isDarkTheme} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const AboutEntry = ({ title, dataArray, isDarkTheme }) => {
    const textClassName = isDarkTheme ? 'textColorDark' : 'textColorLight';

    if (title === 'Press') {
        return (
            <div className="aboutEntry">
                <h2 className={`titleAbout ${textClassName}`}>{title}</h2>
                {dataArray?.map((entry, index) => (
                    <React.Fragment key={index}>
                        <a className={`aboutLink ${textClassName}`} href={entry.text}>
                            {entry.year}
                        </a>
                        <br />
                    </React.Fragment>
                ))}
            </div>
        );
    } else {
        return (
            <div className="aboutEntry">
                <h2 className={`titleAbout ${textClassName}`}>{title}</h2>
                <div className="contentAbout">
                    {dataArray?.map((entry, index) => (
                        <div className="aboutRow" key={index}>
                            <div className={`aboutYear ${textClassName}`}>{entry.year}</div>
                            <div className={`aboutText ${textClassName}`}>{entry.text}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default About;