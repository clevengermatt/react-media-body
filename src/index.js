import React, { Component } from "react";
import ReactPlayer from "react-player";
import Linkify from "react-linkify";

class MediaBody extends Component {
  // requires react-player
  renderSections = () => {
    let sections = [];
    let body = this.props.children;

    if (body) {
      // this super long regex
      // matchs paragraphs or links
      // so we can handle each separately
      sections = body.match(
        /((https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})|[^\r\n]+(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})|[^\r\n]+)/g
      );
    }

    if (sections.length > 0) {
      return sections.map((section, i) => {
        // check if react player can play this section
        const playerCanPlay = ReactPlayer.canPlay(section);
        if (playerCanPlay) {
          return (
            <ReactPlayer key={i} width={this.props.mediaWidth} url={section} />
          );
        }

        // check if this section is an image link
        if (/(https?:\/\/.*\.(?:png|jpg|gif))/i.test(section)) {
          return (
            <img
              key={i}
              style={{ width: this.props.mediaWidth }}
              alt=""
              src={section}
            />
          );
        }

        return (
          <p key={i}>
            <Linkify>{section}</Linkify>
          </p>
        );
      });
    }

    return <div />;
  };

  render() {
    const className = this.props.className;
    const style = this.props.style;
    return (
      <div className={className} style={style}>
        {this.renderSections(this.props.children)}
      </div>
    );
  }
}

export default MediaBody;
