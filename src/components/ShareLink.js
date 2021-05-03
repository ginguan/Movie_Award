import React from 'react';
import {Popup} from 'semantic-ui-react';
import '../App.css';
import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    TwitterIcon,
    TwitterShareButton,
} from "react-share";

const ShareLink = () =>{
    const shareUrl = "https://ginguan.github.io/Movie_Award/"
    const title = 'Movie Award';
    return(
        <div style = {{marginTop:15, fontWeight: "bold"}}> Share:
            <Popup content='Share via Twitter' basic position='bottom center'
                   trigger={
                       <TwitterShareButton className="share-btn" url={shareUrl} title = {title}>
                           <TwitterIcon size={32} round={true} />
                       </TwitterShareButton>
                   } />
            <Popup content='Share via Facebook' basic position='bottom center'
                   trigger={
                       <FacebookShareButton className="share-btn" url={shareUrl}  title = {title}>
                           <FacebookIcon size={32} round={true} />
                       </FacebookShareButton>
                   } />
            <Popup content='Share via Linkedin' basic position='bottom center'
                   trigger={
                       <LinkedinShareButton className="share-btn" url={shareUrl}  title = {title}>
                           <LinkedinIcon size={32} round={true} />
                       </LinkedinShareButton>
                   } />
        </div>
    )
}
export default ShareLink;
