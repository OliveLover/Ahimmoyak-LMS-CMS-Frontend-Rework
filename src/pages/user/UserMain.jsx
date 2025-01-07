import React from 'react';
import Banner from '../../components/user/banner/Banner';
import CourseList from '../../components/user/course/CourseList';

function UserMain() {
  const courses = [
    {
      title: '사내 AI 활용 교육',
      description: '자체 개발 생성형 AI를 활용한 생성형 AI 교육',
      category: 'AI 활용',
      sessions: 7,
      hours: 112,
      type: '내일배움카드',
      image: 'path-to-samsung-image.jpg', // 이미지 경로
    },
    {
      title: '개발/비개발자 AI 활용 교육',
      description: '개발자 및 비개발 직군별 생성형 AI 활용 교육',
      category: 'AI 활용',
      sessions: 8,
      hours: 31,
      type: '기지카',
      image: 'path-to-developer-image.jpg', // 이미지 경로
    },
    {
      title: 'Master PO 교육',
      description: '핀테크 및 IT 스타트업 애자일 방법론 교육',
      category: '직무 교육',
      sessions: 3,
      hours: 16,
      type: '내일배움카드',
      image: 'path-to-master-image.jpg', // 이미지 경로
    },
    {
      title: 'Master PO 교육',
      description: '핀테크 및 IT 스타트업 애자일 방법론 교육',
      category: '직무 교육',
      sessions: 3,
      hours: 16,
      type: '내일배움카드',
      image: 'path-to-master-image.jpg', // 이미지 경로
    },
    {
      title: 'Master PO 교육',
      description: '핀테크 및 IT 스타트업 애자일 방법론 교육',
      category: '직무 교육',
      sessions: 3,
      hours: 16,
      type: '내일배움카드',
      image: 'path-to-master-image.jpg', // 이미지 경로
    },
    {
      title: 'Master PO 교육',
      description: '핀테크 및 IT 스타트업 애자일 방법론 교육',
      category: '직무 교육',
      sessions: 3,
      hours: 16,
      type: '내일배움카드',
      image: 'path-to-master-image.jpg', // 이미지 경로
    },
    {
      title: 'Master PO 교육',
      description: '핀테크 및 IT 스타트업 애자일 방법론 교육',
      category: '직무 교육',
      sessions: 3,
      hours: 16,
      type: '내일배움카드',
      image: 'path-to-master-image.jpg', // 이미지 경로
    },
  ];

  return (
    <div>
      <Banner />
      <CourseList courses={courses} />
    </div>
  );
}

export default UserMain;