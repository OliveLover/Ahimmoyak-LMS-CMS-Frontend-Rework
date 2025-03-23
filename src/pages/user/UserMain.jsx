import React from 'react';
import Banner from '../../components/user/banner/Banner';
import MainCourseDisplay from '../../components/user/course/MainCourseDisplay';
import { jobSkillCategories } from './CourseCategory';
import Navi from '../../components/user/navi/Navi';

function UserMain() {
  return (
    <div>
      <Navi />
      <Banner />
      <MainCourseDisplay type={"ncs"} category={jobSkillCategories} />
    </div>
  );
}

export default UserMain;