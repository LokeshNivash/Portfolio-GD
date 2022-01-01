import React, { useEffect, useState, useRef } from 'react';
import DevButton from '../button/DevButton';
import lodash from "lodash";

const DevProject = (props) => {
    const textContainerRef = useRef();
    const [clamped, setClamped] = useState(true);
    const [showMoreButton, setShowMoreButton] = useState(true);
    const projectId = `${props.project.title.charAt(0).toLowerCase()}${props.project.title.slice(1).replace(/\s/g, '')}`

    // TODO insert animation here or call parent animation
    const handleClick = (event) => {
        setClamped(!clamped);
        console.log(event.target.id);
    }

    useEffect(() => {
        const elOverflowsContainer = (el) => {
            const { clientHeight, scrollHeight } = el;
            return clientHeight !== scrollHeight;
        };

        const getMaxLines = (el) => {
            const { clientHeight } = el;
            const fontsize = 16;
            const lineHeight = 1.1;
            const maxLines = Math.floor(clientHeight / (fontsize * lineHeight));
            return maxLines;
        };

        const readMoreButtonIsVisible = () => {
            if (textContainerRef.current) {
                const hadClampClass = textContainerRef.current.classList.contains("clamp");
                if (!hadClampClass) textContainerRef.current.classList.add("clamp");
                textContainerRef.current.style.setProperty('--maxlines', 0);

                const textOverflowsContainer = elOverflowsContainer(textContainerRef.current);
                setShowMoreButton(textOverflowsContainer);

                if (!hadClampClass) textContainerRef.current.classList.remove("clamp");

                if (textOverflowsContainer) {
                    textContainerRef.current.style.setProperty('--maxlines', getMaxLines(textContainerRef.current));
                }
            }
        };

        readMoreButtonIsVisible();
        const debouncedCheck = lodash.debounce(readMoreButtonIsVisible, 50);

        window.addEventListener("resize", debouncedCheck);

        return () => {
            window.removeEventListener("resize", debouncedCheck);
        };
    }, [textContainerRef])

    return (
        <div className='project-card dev'>
            <div className='card-content dev'>
                <div className='card-front'>
                    <picture>
                        <source type="image/webp" srcSet={process.env.PUBLIC_URL + props.project.webpImage} />
                        <source type="image/jpeg" srcSet={process.env.PUBLIC_URL + props.project.image} />
                        <img loading="lazy" src={process.env.PUBLIC_URL + props.project.image} alt='project preview' />
                    </picture>

                    <div className='front-titles'>
                        <h3 className='card-title dev'>{props.project.title}</h3>
                        <p className='card-subtitle dev'>{props.project.shortDescription}</p>
                    </div>
                </div>

                <div className='card-back'>
                    <div className='card-description-container'>
                        <p
                            className={`card-description ${clamped && 'clamp'}`}
                            ref={textContainerRef}>
                            {props.project.longDescription}
                        </p>
                        {showMoreButton && (
                            <>
                                <input
                                    type="checkbox"
                                    name="readMore"
                                    className="hide"
                                    title="read more"
                                    checked={true}
                                    onChange={(event) => handleClick(event)}
                                    id={projectId}
                                    value={projectId}>
                                </input>

                                <label
                                    className="card-description-btn read-more"
                                    htmlFor={projectId}>
                                    Read {clamped ? "more" : "less"}
                                </label>
                            </>
                        )}
                    </div>

                    <ul className='card-tools'>
                        {props.project.tools.map(tool => {
                            return (<li className='card-tool' key={tool}>{tool}</li>);
                        })}
                    </ul>

                    <div className='card-links'>
                        {(props.project.demoUrl || props.project.videoDemoUrl) && (
                            <DevButton className='demo-link social-btn-container'>
                                <a
                                    className='social-btn'
                                    href={props.project.demoUrl || props.project.videoDemoUrl}
                                    target='_blank'
                                    rel="noreferrer noopener">
                                    <i className="fas fa-play"></i>
                                    <span className='btn-text'>{props.project.demoUrl ? 'live' : 'video'} demo</span>
                                </a>
                            </DevButton>
                        )}

                        <DevButton className='github-link social-btn-container'>
                            <a
                                className='social-btn'
                                href={props.project.githubUrl}
                                target='_blank'
                                rel="noreferrer noopener">
                                <i className="fab fa-github"></i>
                                <span className='btn-text'>Source code</span>
                            </a>
                        </DevButton>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default DevProject;