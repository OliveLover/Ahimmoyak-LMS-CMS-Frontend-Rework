import { useLocation } from "react-router-dom";
import Navi from "../../components/user/navi/Navi";
import LecLinkSlideWrap from "../../components/user/sidebar/LecLinkSlideWrap";

const jobSkillCategories = [
  { codeNum: "01", displayName: "사업관리" },
  { codeNum: "02", displayName: "경영·회계·사무" },
  { codeNum: "03", displayName: "금융·보험" },
  { codeNum: "04", displayName: "교육·자연·사회과학" },
  { codeNum: "05", displayName: "법률·경찰·소방·교도·국방" },
  { codeNum: "06", displayName: "보건·의료" },
  { codeNum: "07", displayName: "사회복지·종교" },
  { codeNum: "08", displayName: "문화·예술·디자인·방송" },
  { codeNum: "09", displayName: "운전·운송" },
  { codeNum: "10", displayName: "영업판매" },
  { codeNum: "11", displayName: "경비·청소" },
  { codeNum: "12", displayName: "이용·숙박·여행·오락·스포츠" },
  { codeNum: "13", displayName: "음식서비스" },
  { codeNum: "14", displayName: "건설" },
  { codeNum: "15", displayName: "기계" },
  { codeNum: "16", displayName: "재료" },
  { codeNum: "17", displayName: "화학·바이오" },
  { codeNum: "18", displayName: "섬유·의복" },
  { codeNum: "19", displayName: "전기·전자" },
  { codeNum: "20", displayName: "정보통신" },
  { codeNum: "21", displayName: "식품가공" },
  { codeNum: "22", displayName: "인쇄·목재·가구·공예" },
  { codeNum: "23", displayName: "환경·에너지·안전" },
  { codeNum: "24", displayName: "농림어업" },
];

const govEduCategories = [];

const UserCourseDetail = () => {
  const location = useLocation();

  let title = "";
  let categories = [];

  if (location.pathname.includes("/courses/ncs")) {
    title = "직무능력 향상 과정";
    categories = jobSkillCategories;
  }
  else if (location.pathname.includes("/courses/gov")) {
    title = "법정 의무 교육";
    categories = govEduCategories;
  }

  return (
    <div className="user-course-detail-container">
      <Navi />
      <LecLinkSlideWrap title={title} categories={categories} />
    </div>
  );
};

export default UserCourseDetail;
