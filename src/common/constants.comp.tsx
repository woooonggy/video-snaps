import React from "react";
import { IAlertContent } from "../types/data.types";

export const ALERT_CONTENT_MAP: { [key: string]: IAlertContent } = {
  appDownload: {
    title: <>이 에피소드는 앱에서 시청 가능해요!</>,
    contents: (
      <>
        지금 앱에서 더 많은 에피소드를
        <br /> 감상해보세요😎
      </>
    ),
    button: (
      <>
        <img
          src="https://www.vigloo.com/assets/icons/ic_download.svg"
          alt="download"
        />
        앱 다운로드 하기
      </>
    ),
  },
  share: {
    title: (
      <>
        <img
          src="https://asset.vigloo.com/KR013P02S01/asset/thumbnail/ko.png?w=384&h=480"
          alt="share"
          width={120}
          height={150}
        />
      </>
    ),
    contents: (
      <>
        ‘우연무역’ 안에서 벌어지는 세 사람의 갈등과 삼각로맨스. 과연 누가 자신의
        목적을 이루고 오금희의 마음을 얻을까?
      </>
    ),
    button: (
      <>
        <img
          src="https://www.vigloo.com/assets/icons/ic_link.svg"
          alt="share"
        />
        링크복사
      </>
    ),
  },
  error: {
    contents: <>[E1007]오류가 발생했습니다. 다시 시도해주세요.</>,
    button: <>확인</>,
  },
};
