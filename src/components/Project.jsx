import MarkdownView from 'react-showdown';
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Project = () => {

    const location = useLocation();
    const { project } = location.state || {};
    const { isDarkTheme } = location.isDarkTheme || true;

    const time = new Date(project?.date?.seconds * 1000).toLocaleDateString();

    const textClassName = isDarkTheme ? 'textColorDark' : 'textColorLight';
    const dividerClassName = `horizontalDivider menuDivider ${isDarkTheme ? 'horizontalDividerInvert' : ''}`;

    console.log(project.vimeo_ur_ls);

    const fixUrl = (url, type) => {
        if (type === 1) {
            return url + '?autoplay=1'
        } else if (type === 2) {
            return 'https://player.vimeo.com/video/' + url
        }
    }

    if (project) {
        return (
            <div className="projectPage">
                <div id='projectPageNavigation'>
                    <div id="categories">
                        <Link className={textClassName} to="/"><p>BACK</p></Link>
                    </div>
                    <div className={dividerClassName}></div>
                </div>
                <h1 className={`projectPageTitle ${textClassName}`}>{project.title}</h1>
                <div className="projectPageContent">
                    <img className="projectPageImage" src={project.cover_image} alt={project.title} />
                    <div className="projectPageVideos">
                        {project?.youtube_urls && (
                            project.youtube_urls.split("\n").map((url, index) => (
                                <iframe className='ProjectVideo' key={`youtube-${index}`} src={fixUrl(url, 1)} allowFullScreen></iframe>
                            ))
                        )}
                        {project?.vimeo_ur_ls && (
                            project.vimeo_ur_ls.split("\n").map((url, index) => (
                                <iframe className='ProjectVideo' key={`vimeo-${index}`} src={fixUrl(url, 2)}></iframe>
                            ))
                        )}
                    </div>
                </div>
                <div className="projectPageDetails">
                    <div className="projectPageText">
                        <MarkdownView markdown={project.project_text || ''} options={{ tables: true, emoji: true }} />
                        <MarkdownView className='projectPageCredits' markdown={project.credits || ''} options={{ tables: true, emoji: true }} />
                    </div>
                    <div className='projectPageData'>
                        <MarkdownView markdown={project.details || ''} options={{ tables: true, emoji: true }} />
                        <p className={`projectPageDate ${textClassName}`}>{time}</p>
                        <p className={`projectPageType ${textClassName}`}>
                            {project.project_type.map((type, index) => (
                                <span key={index}>{index < project.project_type.length - 1 ? `${type}, ` : type}</span>
                            ))}
                        </p>
                    </div>
                </div>
                <div className="projectPageGallery">
                    {project.images.map((image, index) => (
                        <img className="projectPageGalleryImages" src={image} key={index} />
                    ))}
                </div>
            </div >
        )
    }
}
export default Project;    