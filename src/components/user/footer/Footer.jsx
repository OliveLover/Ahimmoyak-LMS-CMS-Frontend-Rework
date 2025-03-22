import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="user-footer">
      <div className="footer-top">
        <span>회사소개</span> | <span>이용약관</span> | <span>개인정보처리방침</span> | 
        <span>기업담당자</span> | <span>대리점</span> | <span>교강사</span>
      </div>
      <div className="footer-middle">
        <p>주소 : ㅇㅇ시 ㅇㅇ구 ㅇㅇ로 xxx ㅇㅇㅇ C동 308~309호, 교육장: 313호</p>
        <p>대표이사 : ㅇㅇㅇ | 사업자등록번호 : 123-45-67890</p>
        <p>전화 : 0000-0000 | 계산서 문의 전화 : 000-0000-0000</p>
        <p>개인정보관리책임자 : ㅇㅇㅇ | 이메일 : <a href="mailto:*">ㅇㅇㅇ@ㅇㅇㅇ.com</a></p>
      </div>
      <div className="footer-bottom">
        <p>Copyright © 2024 Ahimmoyak. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
