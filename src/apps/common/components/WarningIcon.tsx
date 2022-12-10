import SvgIcon from "@renderer/common/components/SvgIcon";
import InfoTooltip from "@renderer/common/components/InfoTooltip";
// components

const WarningIcon = () => {
  return (
    <InfoTooltip title="경고">
      <SvgIcon icon="Caution" size={20} color="#fd0" />
    </InfoTooltip>
  );
};

export default WarningIcon;
