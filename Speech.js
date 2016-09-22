import React from 'react';

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
    onCurrentWord: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      isStarted: false,
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
    const { isSpeechSupported, isStarted } = this.state;

    if (!isSpeechSupported) {
      return <span />;
    }

    return (
      <div className="speech">
        {(isStarted) ? this.renderPauseButton() : this.renderStartButton()}
        <h1>{this.state.currentWord}</h1>
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
    this.setState({ isStarted: false });
  }

  enablePauseButton() {
    this.setState({ isStarted: true });
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

    window.speechSynthesis.cancel();

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = lang;
    this.utterance.rate = rate;
    this.utterance.pitch = pitch;
    this.utterance.volume = volume;

    this.utterance.onend = () => {
      this.enableStartButton();
      console.log('end');
      window.speechSynthesis.cancel();
    };

    this.utterance.onerror = () => {
      window.speechSynthesis.cancel();
    };

    this.utterance.onboundary = (event) => {
      const words = text.substring(event.charIndex, text.length).split(' ');
      onCurrentWord(words[0]);
    };
  }
}

export default Speech;
