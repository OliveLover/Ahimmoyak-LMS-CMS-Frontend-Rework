import React from 'react';
import Banner from '../../components/user/banner/Banner';
import MainCourseDisplay from '../../components/user/course/MainCourseDisplay';
import { jobSkillCategories } from './CourseCategory';

function UserMain() {
  return (
    <div>
      <Banner />
      <MainCourseDisplay type={"ncs"} category={jobSkillCategories} />
    </div>
  );
}

export default UserMain;