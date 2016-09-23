import React from 'react';
import classnames from 'classnames';

import './Speech.scss';

class Speech extends React.Component {

  static propTypes = {
    text: React.PropTypes.string,
    label: React.PropTypes.string,
    volume: React.PropTypes.number,
    rate: React.PropTypes.number,
    pitch: React.PropTypes.number,
    lang: React.PropTypes.string,
    onCurrentWord: React.PropTypes.func
  };

  static defaultProps = {
    label: 'Listen',
    text: '',
    volume: 1,
    rate: 1,
    pitch: 1,
    lang: null,
    onProgress: () => {},
    onCurrentWord: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
      isStarted: false,
      isFinished: false,
      isSpeechSupported: !!(window.SpeechSynthesisUtterance)
    };
  }

  componentDidMount() {
    const { isSpeechSupported } = this.state;
    if (isSpeechSupported) {
      this._initSpeech();
    }
  }

  render() {
    const { isSpeechSupported, isStarted, isFinished, progress } = this.state;

    if (!isSpeechSupported) {
      console.warn('SpeechSynthesisUtterance is not supported!');
      return <span />;
    }

    const classes = classnames('speech', {
      speech__speaking: isStarted,
      speech__stoped: !isStarted,
      speech__finished: isFinished
    });

    return (
      <div className={classes}>
        {(isStarted) ? this.renderPauseButton() : this.renderStartButton()}
        <div className="speech__progress">
          <div className="speech__progress-bar" style={{width: `${progress}%`}} />
        </div>
      </div>
    );
  }

  renderStartButton = () => {
    return (
      <button className="speech__start-button" onClick={this.onStartClick}>
        <span>►</span> {this.props.label} •
      </button>
    );
  }

  renderPauseButton = () => {
    return (
      <button className="speech__pause-button" onClick={this.onPauseClick}>
        <span>❚❚</span> {this.props.label} •
      </button>
    );
  }

  enableStartButton() {
    this.setState({ isStarted: false});
  }

  enablePauseButton() {
    this.setState({ isStarted: true, isFinished: false });
  }

  setProgress(percent) {
    this.setState({ progress: percent });
  }

  onStartClick = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    } else {
      window.speechSynthesis.speak(this.utterance);
    }

    this.utterance.onstart = () => {
      this.enablePauseButton();
    };

    this.utterance.onresume = () => {
      this.enablePauseButton();
    };
  }

  onPauseClick = () => {
    window.speechSynthesis.pause(this.utterance);

    this.utterance.onpause = () => {
      this.enableStartButton();
    };
  }

  _initSpeech() {
    const { text, volume, rate, pitch, lang, onCurrentWord } = this.props;

    window.speechSynthesis.onvoiceschanged = () => {
      console.log('getVoices:::', window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.cancel();

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = lang;
    this.utterance.rate = rate;
    this.utterance.pitch = pitch;
    this.utterance.volume = volume;



    this.utterance.onend = () => {
      this.enableStartButton();
      this.setState({ isFinished: true });
      window.speechSynthesis.cancel();
    };

    this.utterance.onerror = () => {
      window.speechSynthesis.cancel();
    };

    const textLength = text.length;
    this.utterance.onboundary = (event) => {
      const words = text.substring(event.charIndex, text.length).split(' ');
      const partialLength = event.charIndex + words[0].length;
      this.setProgress((partialLength * 100) / textLength);
      onCurrentWord(words[0]);
    };
  }
}

export default Speech;
