import '../Loader.scss';

export const Triangle = (props) => (
  <div className="loader triangle">
    <svg viewBox="0 0 86 80">
      <polygon points="43 8 79 72 7 72"></polygon>
    </svg>
  </div>
);

Triangle.defaultProps = {
  height: 80,
  width: 80,
  color: 'green',
  label: 'audio-loading',
};
