import React from 'react';
import classes from './Footer.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
} from "@fortawesome/free-brands-svg-icons";


const footer = () => (
    <div className={classes.Footer}>
        <footer className={classes.Site_footer}>
            <div className={classes.Footer}>
                <span className={classes.Footer_social}>
                    <div className={classes.social_container}>
                        <h3>Follow us on different platforms</h3>
                        <a href="https://github.com/karinabarinova"
                        className={classes.youtubesocial}>
                        <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                        <a href="https://github.com/karinabarinova"
                        className={classes.facebooksocial}>
                        <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                        <a href="https://github.com/karinabarinova" className={classes.twittersocial}>
                        <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </a>
                        <a href="https://github.com/karinabarinova"
                        className={classes.instagramsocial}>
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                    </div>
                </span>
                <div className={classes.Footer_credits}>
                    <span className={classes.Footer_credit}>Created and maintained by <a href="/">Karina Barinova</a>.</span>
                    <span className={classes.Footer_credit}>Source code and examples released under the <a href="https://github.com/karinabarinova/stackoverflow-react-frontend">MIT</a> license.</span>
                </div>
            </div>
        </footer>
    </div>
);

export default footer;
