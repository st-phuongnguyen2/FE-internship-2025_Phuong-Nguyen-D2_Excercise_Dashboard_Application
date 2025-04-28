import { Tooltip } from '@mui/material';

interface IEllipsisTooltipProps {
  title: string;
}

const EllipsisTooltip = ({ title }: IEllipsisTooltipProps) => {
  return (
    <Tooltip title={title} arrow>
      <p className="tooltip-text">{title}</p>
    </Tooltip>
  );
};

export default EllipsisTooltip;
