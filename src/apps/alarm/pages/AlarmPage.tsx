import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { ButtonBase } from "@mui/material";

const AlarmPage = () => {
  const { id, type } = useParams();
  return (
    <StylePage>
      <iframe
        width="100%"
        height="600px"
        src="https://www.youtube.com/embed/qioAcx6j11A?controls=0&amp;start=17&autoplay=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <StyleButtonArea>
        <StyleConfirm onClick={() => id && window.alarm.checkRing(id, "start")}>
          다음 알람 진행
        </StyleConfirm>
        <StyleExit onClick={() => id && window.alarm.checkRing(id, "stop")}>
          탈 출 ~ !
        </StyleExit>
      </StyleButtonArea>
    </StylePage>
  );
};

export default AlarmPage;

const StylePage = styled.article`
  display: flex;
  flex-direction: column;
`;

const StyleButtonArea = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 100px;
`;

const StyleExit = styled(ButtonBase)`
  width: 100%;
  height: 100%;
  font-size: 36px;
  font-weight: bold;

  background: ${({ theme }) => theme.color.grayScale.coolGray400};
`;

const StyleConfirm = styled(StyleExit)`
  background: ${({ theme }) => theme.color.primary.blue500};
`;
