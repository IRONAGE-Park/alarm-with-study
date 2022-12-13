import type { NextAction } from "@main/alarms/AlarmMachine/AlarmMachine";
import type { AlarmCommanderType } from "@main/alarms/AlarmCommander/AlarmCommander";
// types

import { useRef } from "react";
import { useParams } from "react-router-dom";
import { ButtonBase } from "@mui/material";
// React modules

import styled from "@emotion/styled";
// styles

interface LinkObject {
  id: string;
  startTime: number;
}

const YOUTUBE_LINK: Record<AlarmCommanderType, LinkObject[]> = {
  study: [
    {
      id: "X4s_rvBQklE",
      startTime: 69,
    },
  ],
  rest: [
    {
      id: "qioAcx6j11A",
      startTime: 17,
    },
  ],
};

const AlarmPage = () => {
  const { id, type } = useParams();
  const linkType: AlarmCommanderType = type === "study" ? "study" : "rest";
  const linkObject = YOUTUBE_LINK[linkType];
  const randomIndex =
    Math.floor(Math.random() * linkObject.length) % linkObject.length;

  const link = useRef(YOUTUBE_LINK[linkType][randomIndex]);

  const onClickMaker = (nextAction: NextAction) => () => {
    if (id) {
      window.alarm.checkRing(id, nextAction);
    }
  };

  return (
    <StylePage>
      <StyleIframe
        src={`https://www.youtube.com/embed/${link.current.id}?controls=0&amp;start=${link.current.startTime}&autoplay=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      <StyleButtonArea>
        <StyleConfirm onClick={onClickMaker("start")}>
          다음 알람 진행
        </StyleConfirm>
        <StyleExit onClick={onClickMaker("stop")}>쉬자...</StyleExit>
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

const StyleIframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 100px);
`;
