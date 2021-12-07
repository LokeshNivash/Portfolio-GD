import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {

    const devMode = useSelector(state => state.devMode);
    const devCaption = 'Depiction of Nika "C-137" cooking up a master plan';
    const devImage = process.env.PUBLIC_URL + '/assets/images/about/devAvatar.png';
    const devWebpImage = process.env.PUBLIC_URL + '/assets/images/about/devAvatar.webp';

    const designCaption = 'Depiction of Nika when in the vicinity of sushi. (you have been warned)';
    const designImage = process.env.PUBLIC_URL + '/assets/images/about/designAvatar.png';
    const designWebpImage = process.env.PUBLIC_URL + '/assets/images/about/designAvatar.webp';

    return (
        <section className='about page' id='about'>

            <div
                className={`about-container ${devMode ? 'dev' : 'des'}`}>

                <h2>About Me</h2>
                <h3>Part {devMode ? 'Developer' : 'Designer'}</h3>

                <figure className='about-image-container'>
                    <picture>
                        <source type="image/webp" srcSet={devMode ? devWebpImage : designWebpImage} />
                        <source type="image/png" srcSet={devMode ? devImage : designImage} />
                        <img loading="lazy" className={`avatar ${devMode ? 'dev' : 'des'}`} src={devMode ? devImage : designImage} alt='Avatar of Nneka' />
                    </picture>
                    <figcaption className='about-caption'>{devMode ? devCaption : designCaption}</figcaption>
                </figure>

                <article className='about-text'>
                    <p>
                        My name is Nneka Tielman, (<em> feel free to call me Nika, as many people struggle to pronounce the name </em>). I'm a full-stack developer with an art &amp; design background, currently residing in The Hague.
                    </p>

                    <br />

                    <p>
                        <strong>I enjoy working with:</strong><em> React, JavaScript,</em> and <em>Python</em>
                        <br />
                        <strong>Currently learning:</strong><em> GSAP, Three.js</em>
                    </p>

                    <br />

                    <p>
                        Coming from a creative background taught me to carefully consider my audience and what experience I intend for them to have through my work. The projects I'm most passionate to work on are undoubtedly front-end, especially where I get the opportunity to tell a story through UI effects, animations, and creating a dynamic user experience.
                    </p>

                    <br />

                    <strong>Some random facts:</strong>
                    <ul>
                        <li>🏝 Born in Curaçao</li>
                        <li>🗣 Speaks 5 languages</li>
                        <li>📺 Enjoys watching cartoons <br /> <small>(Rick & Morty and Gravity Falls are some of my favorites)</small></li>
                        <li>🎨 Worked as an illustrator/ visual artist for 7 years</li>
                        <li>🍣 Addicted to sushi</li>
                        <li>😎 Has an awesome sense of humor</li>
                    </ul>

                    <br />

                    <p>
                        Whether it's crafting design visuals or puzzling over coding challenges, I'm thrilled for the opportunity to create amazing work with awesome people. If you're looking for a creative, highly-motivated developer or just want to say hi, feel free to email me at <strong><a href='mailto:khalienne@gmail.com'>khalienne@gmail.com</a></strong> or message me through <strong><a href='#contact'>one of my other socials</a></strong> listed below.
                    </p>
                </article>
            </div>
        </section>
    );
}

export default About;