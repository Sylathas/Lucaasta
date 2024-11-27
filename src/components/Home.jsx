import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MarkdownView from 'react-showdown';

function Home({ data, category, setFilter, isDarkTheme }) {
    return (
        <div id="grid">
            <div id="categoryMenu">
                <MenuCategories category={category} setFilter={setFilter} isDarkTheme={isDarkTheme} />
            </div>
            {data?.length > 0 &&
                data.map((project) => {
                    if (project?.project_type?.includes(category) || category === '') {
                        return (
                            <React.Fragment key={project.id}>
                                <ProjectThumb project={project} isDarkTheme={isDarkTheme} />
                                <div className={isDarkTheme ? 'horizontalDividerInvert' : 'horizontalDivider'}></div>
                            </React.Fragment>
                        );
                    }
                })}
        </div>
    );
}

const MenuCategories = ({ category, setFilter, isDarkTheme }) => {
    const dividerClassName = `horizontalDivider menuDivider ${isDarkTheme ? 'horizontalDividerInvert' : ''}`;
    const textClassName = isDarkTheme ? 'textColorDark' : 'textColorLight';

    switch (category) {
        case '':
            return null;
        case 'Film':
        case 'Artist Film':
        case 'Commercial Film':
            return (
                <>
                    <div id="categories">
                        <p className={`${textClassName} ${category === 'Artist Film' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Artist Film')}>
                            Artist Films
                        </p>
                        <p className={`${textClassName} ${category === 'Commercial Film' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Commercial Film')}>
                            Commercial Films
                        </p>
                    </div>
                    <div className={dividerClassName}></div>
                </>
            );
        default:
            return (
                <>
                    <div id="categories">
                        <p className={`${textClassName} ${category === 'Photography' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Photography')}>
                            Photography
                        </p>
                        <p className={`${textClassName} ${category === 'Performance' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Performance')}>
                            Performance
                        </p>
                        <p className={`${textClassName} ${category === 'Sculpture' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Sculpture')}>
                            Sculpture
                        </p>
                        <p className={`${textClassName} ${category === 'Drawing' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Drawing')}>
                            Drawing
                        </p>
                        <p className={`${textClassName} ${category === 'Publication' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Publication')}>
                            Publication
                        </p>
                        <p className={`${textClassName} ${category === 'Film' ? 'activeMenuItem' : ''}`} onClick={() => setFilter('Film')}>
                            Film
                        </p>
                    </div>
                    <div className={dividerClassName}></div>
                </>
            );
    }
};

const ProjectThumb = (props) => {
    const { project, isDarkTheme } = props;
    const navigate = useNavigate();
    const time = new Date(project.date.seconds * 1000).toLocaleDateString();

    const projectTextRef = useRef(null);

    useEffect(() => {
        function applyDynamicLineClamp() {
            const container = projectTextRef.current;

            if (container) {
                const paragraph = container.querySelector('p');

                if (paragraph) {
                    const containerHeight = container.clientHeight;
                    const lineHeight = parseFloat(getComputedStyle(paragraph).lineHeight);
                    const maxLines = Math.floor(containerHeight / lineHeight);
                    paragraph.style.display = '-webkit-box';
                    paragraph.style.webkitBoxOrient = 'vertical';
                    paragraph.style.overflow = 'hidden';
                    paragraph.style.setProperty('-webkit-line-clamp', maxLines - 4);
                }
            }
        }

        applyDynamicLineClamp();
        window.addEventListener('resize', applyDynamicLineClamp);

        return () => {
            window.removeEventListener('resize', applyDynamicLineClamp);
        };
    }, []);

    const textClassName = isDarkTheme ? 'textColorDark' : 'textColorLight';

    return (
        <div className="project">
            <div className="projectContent">
                <h1 className={`projectTitle ${textClassName}`}>{project.title}</h1>
                <div className="projectText" ref={projectTextRef}>
                    <MarkdownView markdown={project.project_text || ''} options={{ tables: true, emoji: true }} />
                    <p className={`projectOpen ${textClassName}`} onClick={() => navigate(`${project.id}`, { state: { project }, isDarkTheme: { isDarkTheme } })}>
                        Discover More
                    </p>
                </div>
            </div>
            <div className="projectDetails">
                <p className={`projectDate ${textClassName}`}>{time}</p>
                <p className={`projectType ${textClassName}`}>
                    {project.project_type.map((type, index) => (
                        <span key={index}>{index < project.project_type.length - 1 ? `${type}, ` : type}</span>
                    ))}
                </p>
            </div>
            <div className="projectImageContainer">
                <img className="projectImage" src={project.cover_image} alt={project.title} />
            </div>
        </div>
    );
};

export default Home;