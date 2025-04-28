import myTaskIcon from '../../../assets/icons/my-task-icon.svg';
import tickIcon from '../../../assets/icons/tick-icon.svg';

const MyTaskIcon = () => {
  return (
    <div className="icon-group">
      <img src={myTaskIcon} alt="my-task-icon" className="icon" />
      <img src={tickIcon} alt="tick-icon" className="tick-icon icon" />
    </div>
  );
};

export default MyTaskIcon;
